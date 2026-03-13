"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaCreditCard,
  FaShieldAlt,
  FaUtensils,
  FaBed,
  FaBath,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import {
  MdMedicalServices,
  MdCleaningServices,
  MdSupportAgent,
} from "react-icons/md";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ROOMS } from "../rooms/rooms.data";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";
import { Suspense } from "react";

// Tipos
interface BookingPayload {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  extras: string[];
  total: number;
  nights: number;
  pricePerNight: number;
}

interface Extra {
  id: string;
  title: string;
  price: number;
  images: string[];
}

interface AvailableRoom {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  bathroom_type: string;
  image: string;
  available: boolean;
}

// Datos de extras
const EXTRAS: Extra[] = [
  {
    id: "b01g",
    title: "ORIGINAL RECOVERY BRA - STYLE NO. B01G",
    price: 80,
    images: ["/extra1-1.png", "/extra1-2.png", "/extra1-3.png"],
  },
  {
    id: "fvom",
    title: "OPEN BUST VEST - 3/4 LENGTH SLEEVES - STYLE NO. FVOM",
    price: 80,
    images: ["/extra2-1.png", "/extra2-2.png", "/extra2-3.png"],
  },
  {
    id: "sfbhrs",
    title:
      "REINFORCED GIRDLE WITH HIGH-BACK AND LAYERED PANELS - SHORT LENGTH - STYLES NO. SFBHRS",
    price: 140,
    images: ["/extra3-1.png", "/Extra3-2.png", "/extra3-3.png"],
  },
  {
    id: "sfbhs2",
    title:
      "GIRDLE WITH HIGH-BACK - NO CLOSURES - SHORT LENGHT - STYLE NO. SFBHS2",
    price: 140,
    images: ["/extra4-1.png", "/extra4-2.png", "/extra4-3.png"],
  },
];

// Función para verificar disponibilidad de múltiples habitaciones
const checkBulkAvailability = async (
  checkIn: string,
  checkOut: string,
): Promise<{ [roomId: string]: boolean }> => {
  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const response = await axios.post(`${apiBaseUrl}/api/bulk-availability`, {
      checkIn,
      checkOut,
      roomIds: ROOMS.map((r) => r.id),
    });
    return response.data;
  } catch (error) {
    console.error("Error checking bulk availability:", error);
    return {};
  }
};

// Función para verificar disponibilidad de una habitación específica
const checkAvailability = async (
  roomId: string,
  checkIn: string,
  checkOut: string,
): Promise<{ available: boolean; message?: string }> => {
  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const response = await axios.post(`${apiBaseUrl}/api/check-availability`, {
      roomId,
      checkIn,
      checkOut,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking availability:", error);
    return { available: false, message: "Error checking availability" };
  }
};

// Función para validar fechas
const validateDates = (
  checkIn: string,
  checkOut: string,
  t: (key: string) => string,
): { isValid: boolean; errorMessage: string | null } => {
  if (!checkIn) {
    return {
      isValid: false,
      errorMessage: t("booking.errors.checkInRequired"),
    };
  }
  if (!checkOut) {
    return {
      isValid: false,
      errorMessage: t("booking.errors.checkOutRequired"),
    };
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkInDate < today) {
    return { isValid: false, errorMessage: t("booking.errors.checkInPast") };
  }

  if (checkOutDate <= checkInDate) {
    return {
      isValid: false,
      errorMessage: t("booking.errors.checkOutAfterCheckIn"),
    };
  }

  return { isValid: true, errorMessage: null };
};

// Función para validar el formulario paso 2
const validateStep2 = (
  formData: any,
  t: (key: string) => string,
): { isValid: boolean; errorMessage: string | null } => {
  if (!formData.fullName) {
    return {
      isValid: false,
      errorMessage: t("booking.errors.fullNameRequired"),
    };
  }
  if (!formData.email) {
    return { isValid: false, errorMessage: t("booking.errors.emailRequired") };
  }
  if (!formData.phone) {
    return { isValid: false, errorMessage: t("booking.errors.phoneRequired") };
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return { isValid: false, errorMessage: t("booking.errors.invalidEmail") };
  }

  return { isValid: true, errorMessage: null };
};

// Función para calcular noches
const calculateNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diff = checkOutDate.getTime() - checkInDate.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

// Función para calcular total de extras
const calculateExtrasTotal = (selectedExtras: string[]): number => {
  return selectedExtras.reduce((total, id) => {
    const extra = EXTRAS.find((item) => item.id === id);
    return total + (extra?.price || 0);
  }, 0);
};

// Función para calcular total general
const calculateTotal = (
  selectedRoomData: (typeof ROOMS)[0] | null,
  checkIn: string,
  checkOut: string,
  selectedExtras: string[],
  guests = 1,
): number => {
  if (!selectedRoomData || calculateNights(checkIn, checkOut) <= 0) return 0;
  const numberOfGuests = guests || 1;
  const roomTotal =
    selectedRoomData.price *
    calculateNights(checkIn, checkOut) *
    numberOfGuests;
  return roomTotal + calculateExtrasTotal(selectedExtras);
};

// Función para manejar el cambio de paso
const handleStepChange = (newStep: number, setStep: (step: number) => void) => {
  setStep(newStep);
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 100);
};

// Función para enviar email de confirmación
const sendConfirmationEmail = async (bookingData: BookingPayload) => {
  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    await axios.post(
      `${apiBaseUrl}/api/send-booking-confirmation`,
      bookingData,
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

// Función para resetear el formulario después de reservar
const resetBookingForm = (
  setSelectedRoom: (room: string | null) => void,
  setSelectedExtras: (extras: string[]) => void,
  setFormData: (data: any) => void,
  setStep: (step: number) => void,
  setStatus: (status: "idle" | "submitting" | "success" | "error") => void,
  setShowSuccessModal: (show: boolean) => void,
) => {
  setSelectedRoom(null);
  setSelectedExtras([]);
  setFormData({
    checkIn: "",
    checkOut: "",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
  });
  setStep(1);
  setStatus("idle");
  setShowSuccessModal(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Función para manejar el submit final
const handleFinalSubmit = async (
  formData: any,
  selectedRoom: string | null,
  selectedExtras: string[],
  t: (key: string) => string,
  setStatus: (status: "idle" | "submitting" | "success" | "error") => void,
  setErrorText: (error: string | null) => void,
  setShowSuccessModal: (show: boolean) => void,
  setConfirmationData: (data: any) => void,
): Promise<void> => {
  try {
    setStatus("submitting");
    setErrorText(null);

    // Validar que hay una habitación seleccionada
    if (!selectedRoom) {
      throw new Error(t("booking.errors.selectRoomRequired"));
    }

    const roomData = ROOMS.find((r) => r.id === selectedRoom);
    if (!roomData) {
      throw new Error(t("booking.errors.roomNotFound"));
    }

    // Verificar disponibilidad nuevamente
    const availability = await checkAvailability(
      selectedRoom,
      formData.checkIn,
      formData.checkOut,
    );
    if (!availability.available) {
      throw new Error(
        availability.message || t("booking.errors.roomNotAvailable"),
      );
    }

    const nights = calculateNights(formData.checkIn, formData.checkOut);
    const total = calculateTotal(
      roomData,
      formData.checkIn,
      formData.checkOut,
      selectedExtras,
      1,
    );

    // Preparar payload para la API
    const payload: BookingPayload = {
      roomId: selectedRoom,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: 1,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.specialRequests,
      extras: selectedExtras,
      total,
      nights,
      pricePerNight: roomData.price,
    };

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Enviar reserva a la base de datos
    const response = await axios.post(`${apiBaseUrl}/api/bookings`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Enviar email de confirmación
    await sendConfirmationEmail(payload);

    // Guardar datos de confirmación
    setConfirmationData({
      ...payload,
      confirmationNumber: response.data.confirmationNumber,
      bookingId: response.data.bookingId,
    });

    setStatus("success");
    setShowSuccessModal(true);
  } catch (error) {
    setStatus("error");
    if (axios.isAxiosError(error)) {
      setErrorText(error.response?.data?.error || t("booking.errors.server"));
    } else if (error instanceof Error) {
      setErrorText(error.message);
    } else {
      setErrorText(t("booking.errors.unknown"));
    }
  }
};

// Modal de éxito
const SuccessModal = ({
  isOpen,
  onClose,
  confirmationData,
  onNewBooking,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  confirmationData: any;
  onNewBooking: () => void;
  t: (key: string, options?: any) => string;
}) => {
  if (!isOpen) return null;

  const getRoomName = (roomId: string) => {
    switch (roomId) {
      case "standard":
        return t("rooms.standard.name");
      case "deluxe":
        return t("rooms.deluxe.name");
      case "shared":
        return t("rooms.shared.name");
      default:
        return roomId;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideInUp">
        <div className="bg-wine p-6 text-white text-center">
          <FaCheckCircle className="text-6xl mx-auto mb-4 text-white" />
          <h2 className="text-3xl font-bold mb-2">{t("booking.success")}</h2>
          <p className="text-cream">{t("booking.successMessage")}</p>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-wine mb-4">
              {t("booking.confirmationDetails")}
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-olive-dark font-medium">
                  {t("booking.confirmationNumber")}:
                </span>
                <span className="font-bold text-wine">
                  {confirmationData?.confirmationNumber}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.fields.room")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {getRoomName(confirmationData?.roomId)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.fields.checkIn")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {confirmationData?.checkIn}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.fields.checkOut")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {confirmationData?.checkOut}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.nights")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {confirmationData?.nights}{" "}
                  {t("common.night", { count: confirmationData?.nights })}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.guests")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {confirmationData?.guests ?? 1}{" "}
                  {t("common.guest", { count: confirmationData?.guests ?? 1 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.fields.fullName")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {confirmationData?.fullName}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-olive-dark font-medium">
                  {t("booking.fields.email")}:
                </span>
                <span className="font-semibold text-olive-dark">
                  {confirmationData?.email}
                </span>
              </div>

              {confirmationData?.extras &&
                confirmationData.extras.length > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-olive-dark font-medium">
                      {t("booking.extras")}:
                    </span>
                    <span className="font-semibold text-olive-dark">
                      ${confirmationData?.extrasTotal}
                    </span>
                  </div>
                )}

              <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2">
                <span className="text-xl font-bold text-olive-dark">
                  {t("booking.total")}:
                </span>
                <span className="text-3xl font-bold text-wine">
                  ${confirmationData?.total}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-cream border border-wine/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-olive-dark">
              <strong className="text-wine">{t("booking.important")}:</strong>{" "}
              {t("booking.emailSent")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onNewBooking}
              className="flex-1 bg-wine text-white py-3 rounded-xl font-semibold hover:bg-wine/90 transition-colors"
            >
              {t("booking.newBooking")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingPageInner = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const searchParams = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [galleryExtraId, setGalleryExtraId] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [availableRooms, setAvailableRooms] = useState<{
    [roomId: string]: boolean;
  }>({});
  const [isSearchingRooms, setIsSearchingRooms] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const today = new Date();
  const currentHour = today.getHours();

  // Si son las 14 horas o más, usar mañana como fecha mínima
  if (currentHour >= 14) {
    today.setDate(today.getDate() + 1);
  }

  const todayValue = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const DEFAULT_GUEST_COUNT = 1;

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
  });

  // Obtener room param de URL
  useEffect(() => {
    const roomParam = searchParams.get("room");
    if (roomParam && ROOMS.some((r) => r.id === roomParam)) {
      setSelectedRoom(roomParam);
    }
  }, [searchParams]);

  const selectedRoomData = selectedRoom
    ? (ROOMS.find((r) => r.id === selectedRoom) ?? null)
    : null;

  const getRoomText = (id: string, key: string) => t(`rooms.${id}.${key}`);

  // Función para buscar habitaciones disponibles
  const searchAvailableRooms = async () => {
    const datesValidation = validateDates(
      formData.checkIn,
      formData.checkOut,
      t,
    );
    if (!datesValidation.isValid) {
      setValidationError(datesValidation.errorMessage);
      return;
    }

    setIsSearchingRooms(true);
    setValidationError(null);
    setHasSearched(true);

    try {
      const availability = await checkBulkAvailability(
        formData.checkIn,
        formData.checkOut,
      );
      setAvailableRooms(availability);

      // Si la habitación actualmente seleccionada no está disponible, deseleccionarla
      if (selectedRoom && availability[selectedRoom] === false) {
        setSelectedRoom(null);
        setValidationError(t("booking.errors.selectedRoomNotAvailable"));
      }
    } catch (error) {
      console.error("Error searching rooms:", error);
      setValidationError(t("booking.errors.availabilityCheckFailed"));
    } finally {
      setIsSearchingRooms(false);
    }
  };

  const handleInputChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores
    if (status === "error") {
      setStatus("idle");
      setErrorText(null);
    }
    setValidationError(null);

    // Resetear búsqueda cuando cambian las fechas
    if (name === "checkIn" || name === "checkOut") {
      setHasSearched(false);
      setAvailableRooms({});
    }
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const openGallery = (id: string, index: number) => {
    setGalleryExtraId(id);
    setGalleryIndex(index);
  };

  const closeGallery = () => {
    setGalleryExtraId(null);
    setGalleryIndex(0);
  };

  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const extrasTotal = calculateExtrasTotal(selectedExtras);
  const total = calculateTotal(
    selectedRoomData,
    formData.checkIn,
    formData.checkOut,
    selectedExtras,
    1,
  );

  const handleNextClick = async () => {
    if (step === 1) {
      // En paso 1, validar que hay fechas y habitación seleccionada
      if (!selectedRoom) {
        setValidationError(t("booking.errors.selectRoomRequired"));
        return;
      }
      if (!hasSearched) {
        setValidationError(t("booking.errors.searchRoomsFirst"));
        return;
      }
      handleStepChange(step + 1, setStep);
    } else if (step === 2) {
      // Validación completa del paso 2
      const validation = validateStep2(formData, t);
      if (!validation.isValid) {
        setValidationError(validation.errorMessage);
        return;
      }
      handleStepChange(step + 1, setStep);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      await handleNextClick();
    } else {
      await handleFinalSubmit(
        formData,
        selectedRoom,
        selectedExtras,
        t,
        setStatus,
        setErrorText,
        setShowSuccessModal,
        setConfirmationData,
      );
    }
  };

  const handleNewBooking = () => {
    resetBookingForm(
      setSelectedRoom,
      setSelectedExtras,
      setFormData,
      setStep,
      setStatus,
      setShowSuccessModal,
    );
    setHasSearched(false);
    setAvailableRooms({});
  };

  const getRoomAvailabilityStatus = (roomId: string) => {
    if (!hasSearched) return "unknown";
    return availableRooms[roomId] ? "available" : "unavailable";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Mostrar mensajes de estado */}
      {status === "success" && !showSuccessModal && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-sage text-white px-6 py-3 rounded-full shadow-lg animate-slideInDown">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-white" />
            <span className="font-medium">{t("booking.success")}</span>
          </div>
        </div>
      )}

      {status === "error" && errorText && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-wine text-white px-6 py-3 rounded-full shadow-lg animate-slideInDown">
          <div className="flex items-center gap-2">
            <FaTimes className="text-white" />
            <span className="font-medium">{errorText}</span>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        confirmationData={confirmationData}
        onNewBooking={handleNewBooking}
        t={t}
      />

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm pt-24 md:pt-28 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10" />
            <div
              className="absolute top-6 left-0 h-1 bg-wine rounded-full transition-all duration-700 ease-out -z-10"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />

            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center z-10">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    shadow-md transition-all duration-500 transform
                    ${
                      step > num
                        ? "bg-wine text-white"
                        : step === num
                          ? "bg-wine text-white scale-110 ring-4 ring-wine/20"
                          : "bg-white text-gray-400 border-2 border-gray-300"
                    }
                  `}
                >
                  {step > num ? <FaCheck className="text-white" /> : num}
                </div>
                <span
                  className={`mt-3 text-xs md:text-sm font-medium transition-colors duration-300 ${
                    step >= num ? "text-wine" : "text-gray-400"
                  }`}
                >
                  {num === 1
                    ? t("booking.steps.select")
                    : num === 2
                      ? t("booking.steps.details")
                      : t("booking.steps.confirm")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-wine mb-3">
                {t("booking.title")}
              </h1>
              <p className="text-base md:text-lg text-olive-dark">
                {t("booking.subtitle")}
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              {/* Step 1: Date Selection & Room Search */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-wine">
                      {t("booking.selectDatesTitle")}
                    </h2>
                  </div>

                  {/* Info de check-in/check-out */}
                  <div className="bg-cream border border-wine/20 rounded-xl p-4 flex items-start gap-3">
                    <FaInfoCircle className="text-wine text-xl flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-olive-dark">
                      <p className="font-semibold mb-1 text-wine">
                        {t("booking.checkInOutInfo")}:
                      </p>
                      <p>• {t("booking.checkInTime")}: 2:00 PM (14:00 hrs)</p>
                      <p>• {t("booking.checkOutTime")}: 11:00 AM</p>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-wine mb-6 flex items-center gap-2">
                      <FaCalendarAlt className="text-wine" />
                      {t("booking.selectDates")}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="block text-sm font-semibold text-olive-dark mb-2">
                          {t("booking.fields.checkIn")}
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={todayValue}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine transition-all duration-300 group-hover:border-gray-300 text-olive-dark"
                          required
                          disabled={status === "submitting"}
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-olive-dark mb-2">
                          {t("booking.fields.checkOut")}
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || todayValue}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine transition-all duration-300 group-hover:border-gray-300 text-olive-dark"
                          required
                          disabled={status === "submitting"}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={searchAvailableRooms}
                        disabled={
                          isSearchingRooms ||
                          !formData.checkIn ||
                          !formData.checkOut
                        }
                        className="w-full bg-wine text-white py-4 rounded-xl font-semibold hover:bg-wine/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSearchingRooms ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>{t("booking.searching")}</span>
                          </>
                        ) : (
                          <>
                            <FaSearch />
                            <span>{t("booking.searchRooms")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Room Selection - Solo se muestra después de buscar */}
                  {hasSearched && (
                    <div className="space-y-5 animate-fadeIn">
                      <h3 className="text-xl font-bold text-wine mb-4">
                        {t("booking.selectRoomTitle")}
                      </h3>

                      {ROOMS.map((room) => {
                        const isSelected = selectedRoom === room.id;
                        const availabilityStatus = getRoomAvailabilityStatus(
                          room.id,
                        );
                        const isAvailable = availabilityStatus === "available";

                        if (!isAvailable && availabilityStatus !== "unknown") {
                          return null; // No mostrar habitaciones no disponibles
                        }

                        return (
                          <div key={room.id} className="space-y-0">
                            <div
                              onClick={() =>
                                isAvailable && setSelectedRoom(room.id)
                              }
                              className={`
                                group relative overflow-hidden rounded-2xl cursor-pointer 
                                transition-all duration-500 transform hover:scale-[1.02]
                                ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                                ${
                                  isSelected
                                    ? "ring-4 ring-wine shadow-2xl shadow-wine/20"
                                    : "ring-1 ring-gray-200 hover:ring-2 hover:ring-wine/50 hover:shadow-xl"
                                }
                              `}
                            >
                              <div className="bg-white p-5 md:p-7">
                                <div className="flex flex-col md:flex-row gap-6">
                                  {/* Image */}
                                  <div className="md:w-1/3 relative">
                                    <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                                      <img
                                        src={room.image}
                                        alt={getRoomText(room.id, "imageAlt")}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                      {isSelected && (
                                        <div className="absolute top-3 right-3 z-10 animate-scaleIn">
                                          <FaCheckCircle className="text-wine text-4xl drop-shadow-lg" />
                                        </div>
                                      )}

                                      {!isAvailable && (
                                        <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center">
                                          <span className="bg-wine text-white px-4 py-2 rounded-full text-sm font-bold">
                                            {t("booking.notAvailable")}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className="md:w-2/3 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                      <div className="flex-1">
                                        <span className="inline-block bg-wine text-white px-3 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
                                          {getRoomText(room.id, "highlight")}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-wine mb-2">
                                          {getRoomText(room.id, "name")}
                                        </h3>
                                        <p className="text-sm md:text-base text-olive-dark italic">
                                          {getRoomText(room.id, "tagline")}
                                        </p>
                                      </div>
                                      <div className="text-right ml-4">
                                        <div className="text-2xl md:text-3xl font-bold text-wine">
                                          ${room.price}
                                        </div>
                                        <div className="text-xs md:text-sm text-olive-dark font-medium">
                                          {t("booking.perNight")}
                                        </div>
                                      </div>
                                    </div>

                                    <p className="text-sm md:text-base text-gray-700 mb-5 line-clamp-2 md:line-clamp-none">
                                      {getRoomText(room.id, "description")}
                                    </p>

                                    <div className="flex flex-wrap gap-3 md:gap-4 mt-auto">
                                      <div className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg text-sm">
                                        <FaUserFriends className="text-wine" />
                                        <span className="text-olive-dark font-medium">
                                          {t("searchBar.accommodates", {
                                            count: room.capacity,
                                          })}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg text-sm">
                                        <FaBath className="text-wine" />
                                        <span className="text-olive-dark font-medium">
                                          {room.id === "shared"
                                            ? t("searchBar.bathroom.shared")
                                            : t(
                                                "searchBar.bathroom.private",
                                              )}{" "}
                                          {t("searchBar.bathroomLabel")}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 px-3 py-2 bg-cream rounded-lg text-sm">
                                        <MdMedicalServices className="text-wine" />
                                        <span className="text-olive-dark font-medium">
                                          {t("booking.assistance")}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {ROOMS.filter(
                        (room) =>
                          getRoomAvailabilityStatus(room.id) === "available",
                      ).length === 0 && (
                        <div className="text-center py-12 bg-cream rounded-2xl">
                          <FaBed className="text-5xl text-wine/30 mx-auto mb-4" />
                          <p className="text-wine font-medium">
                            {t("booking.noRoomsAvailable")}
                          </p>
                          <p className="text-sm text-olive-dark mt-2">
                            {t("booking.tryDifferentDates")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mostrar error de validación si existe */}
                  {validationError && (
                    <div className="bg-wine/10 border border-wine text-wine px-4 py-3 rounded-lg">
                      {validationError}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center">
                      <FaUserFriends className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-wine">
                      {t("booking.detailsTitle")}
                    </h2>
                  </div>

                  {/* Mostrar error de validación si existe */}
                  {validationError && (
                    <div className="bg-wine/10 border border-wine text-wine px-4 py-3 rounded-lg">
                      {validationError}
                    </div>
                  )}

                  {/* Personal Details */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-wine mb-6 flex items-center gap-2">
                      <FaUserFriends className="text-wine" />
                      {t("booking.personalInformation")}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="md:col-span-2 group">
                        <label className="block text-sm font-semibold text-olive-dark mb-2">
                          {t("booking.fields.fullName")}
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine transition-all duration-300 group-hover:border-gray-300 text-olive-dark"
                          required
                          disabled={status === "submitting"}
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-olive-dark mb-2">
                          {t("booking.fields.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine transition-all duration-300 group-hover:border-gray-300 text-olive-dark"
                          required
                          disabled={status === "submitting"}
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-olive-dark mb-2">
                          {t("booking.fields.phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine transition-all duration-300 group-hover:border-gray-300 text-olive-dark"
                          required
                          disabled={status === "submitting"}
                        />
                      </div>

                      <div className="md:col-span-2 group">
                        <label className="block text-sm font-semibold text-olive-dark mb-2">
                          {t("booking.fields.specialRequests")}
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder={t("booking.specialRequestsPlaceholder")}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine transition-all duration-300 group-hover:border-gray-300 text-olive-dark resize-none"
                          disabled={status === "submitting"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center">
                      <FaCheck className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-wine">
                      {t("booking.confirmTitle")}
                    </h2>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-cream rounded-2xl p-6 md:p-8 shadow-lg border border-wine/20">
                    <h3 className="text-xl font-bold text-wine mb-6">
                      {t("booking.summary")}
                    </h3>

                    {selectedRoomData && (
                      <div className="space-y-5">
                        <div className="flex items-center gap-4 pb-5 border-b-2 border-wine/20">
                          <img
                            src={selectedRoomData.image}
                            alt={getRoomText(selectedRoomData.id, "imageAlt")}
                            className="w-24 h-24 object-cover rounded-xl shadow-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-wine text-lg">
                              {getRoomText(selectedRoomData.id, "name")}
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-2xl font-bold text-wine">
                                ${selectedRoomData.price}
                              </span>
                              <span className="text-sm text-olive-dark">
                                {t("booking.perNight")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 py-4">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-olive-dark font-medium">
                              {t("booking.nights")}:
                            </span>
                            <span className="font-bold text-wine">
                              {nights} {t("common.night", { count: nights })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-olive-dark font-medium">
                              {t("booking.guests")}:
                            </span>
                            <span className="font-bold text-wine">
                              {DEFAULT_GUEST_COUNT}{" "}
                              {t("common.guest", {
                                count: DEFAULT_GUEST_COUNT,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-olive-dark font-medium">
                              {t("booking.roomSubtotal")}:
                            </span>
                            <span className="font-bold text-wine">
                              $
                              {selectedRoomData.price *
                                nights *
                                DEFAULT_GUEST_COUNT}
                            </span>
                          </div>
                          {selectedExtras.length > 0 && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-olive-dark font-medium">
                                {t("booking.extras")}:
                              </span>
                              <span className="font-bold text-wine">
                                ${extrasTotal}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center py-2">
                            <span className="text-olive-dark font-medium">
                              {t("booking.period")}:
                            </span>
                            <span className="font-medium text-olive-dark text-right">
                              {formData.checkIn} (2:00 PM)
                              <br />
                              {formData.checkOut} (11:00 AM)
                            </span>
                          </div>
                        </div>

                        <div className="pt-5 border-t-2 border-wine/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold text-wine">
                              {t("booking.total")}:
                            </span>
                            <span className="text-3xl font-bold text-wine">
                              ${total}
                            </span>
                          </div>
                          <p className="text-sm text-olive-dark">
                            {t("booking.taxesIncluded")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t-2 border-wine/20">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => handleStepChange(step - 1, setStep)}
                    disabled={status === "submitting"}
                    className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-wine text-wine font-bold rounded-full hover:bg-wine hover:text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft className="transition-transform group-hover:-translate-x-1" />
                    {t("booking.back")}
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  disabled={
                    (step === 1 &&
                      (!selectedRoom || !hasSearched || isSearchingRooms)) ||
                    status === "submitting" ||
                    (step === 2 && !!validationError)
                  }
                  className={`
                    group flex items-center justify-center gap-3 px-10 py-4 font-bold rounded-full 
                    transition-all duration-300 transform hover:scale-105 shadow-lg
                    ${
                      ((step === 1 &&
                        selectedRoom &&
                        hasSearched &&
                        !isSearchingRooms) ||
                        (step === 2 && !validationError) ||
                        step === 3) &&
                      status !== "submitting"
                        ? "bg-wine text-white hover:shadow-wine/30 hover:shadow-2xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>{t("common.processing")}</span>
                    </>
                  ) : step < 3 ? (
                    <>
                      {t("booking.next")}
                      <FaChevronRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      {t("booking.confirmBooking")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-wine/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center">
                    <FaBed className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-wine">
                    {t("booking.summary")}
                  </h3>
                </div>

                {selectedRoomData ? (
                  <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={selectedRoomData.image}
                        alt={getRoomText(selectedRoomData.id, "imageAlt")}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="font-bold text-white text-lg mb-1">
                          {getRoomText(selectedRoomData.id, "name")}
                        </h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">
                            ${selectedRoomData.price}
                          </span>
                          <span className="text-sm text-cream">
                            {t("common.perNight")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {formData.checkIn && formData.checkOut && (
                      <div className="space-y-3 p-4 bg-cream rounded-xl">
                        {[
                          {
                            label: t("booking.checkIn"),
                            value: `${formData.checkIn} (2:00 PM)`,
                          },
                          {
                            label: t("booking.checkOut"),
                            value: `${formData.checkOut} (11:00 AM)`,
                          },
                          {
                            label: t("booking.nights"),
                            value: nights,
                          },
                          {
                            label: t("booking.guests"),
                            value: `${DEFAULT_GUEST_COUNT} ${t("common.guest", { count: DEFAULT_GUEST_COUNT })}`,
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm text-olive-dark font-medium">
                              {item.label}:
                            </span>
                            <span className="text-sm font-bold text-wine">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 border-t-2 border-wine/20">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-wine">
                          {t("booking.estimatedTotal")}:
                        </span>
                        <span className="text-2xl font-bold text-wine">
                          ${total}
                        </span>
                      </div>
                      {selectedExtras.length > 0 && (
                        <div className="mt-3 p-3 bg-cream rounded-lg border border-wine/20">
                          <p className="text-xs font-semibold text-wine mb-2">
                            {t("booking.extrasAdded")}:
                          </p>
                          {selectedExtras.map((id) => {
                            const extra = EXTRAS.find((item) => item.id === id);
                            if (!extra) return null;
                            return (
                              <div
                                key={extra.id}
                                className="flex justify-between items-center text-xs text-olive-dark mb-1"
                              >
                                <span className="truncate flex-1">
                                  {extra.title.substring(0, 30)}...
                                </span>
                                <span className="font-bold text-wine ml-2">
                                  ${extra.price}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <p className="text-xs text-olive-dark mt-2">
                        {t("booking.taxesIncludedShort")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
                      <FaBed className="text-3xl text-wine/30" />
                    </div>
                    <p className="text-olive-dark font-medium">
                      {t("booking.selectRoomHelper")}
                    </p>
                  </div>
                )}

                {/* Benefits */}
                <div className="mt-8 pt-8 border-t-2 border-wine/20">
                  <h4 className="font-bold text-wine mb-5 text-lg flex items-center gap-2">
                    <FaCheck className="text-wine" />
                    {t("booking.included")}
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        icon: MdMedicalServices,
                        text: t("roomDetail.medicalAssistance"),
                      },
                      {
                        icon: FaUtensils,
                        text: t("roomDetail.allMeals"),
                      },
                      {
                        icon: MdCleaningServices,
                        text: t("roomDetail.dailyCleaning"),
                      },
                      {
                        icon: MdSupportAgent,
                        text: t("booking.personalizedSupport"),
                      },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-cream rounded-lg hover:bg-cream/80 transition-colors"
                      >
                        <benefit.icon className="text-xl text-wine flex-shrink-0" />
                        <span className="text-sm font-medium text-olive-dark">
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 p-5 bg-cream rounded-xl border border-wine/20">
                  <p className="text-sm text-olive-dark text-center">
                    <span className="font-semibold text-wine">
                      {t("roomDetail.needHelp")}
                    </span>{" "}
                    <Link
                      href={getLocalizedPath("/contact", currentLang)}
                      className="text-wine font-bold hover:underline inline-flex items-center gap-1 group"
                    >
                      {t("common.contactUs")}
                      <FaChevronRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Gallery */}
      {galleryExtraId && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fadeIn"
          onClick={closeGallery}
        >
          {(() => {
            const extra = EXTRAS.find((item) => item.id === galleryExtraId);
            if (!extra) return null;
            const images = extra.images;
            const currentImage = images[galleryIndex] || images[0];
            return (
              <div
                className="w-full h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sage text-xs font-bold uppercase tracking-wider">
                          {t("booking.recoveryGarment")}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60 text-xs font-medium">
                          {galleryIndex + 1} {t("common.of")} {images.length}
                        </span>
                      </div>
                      <h2 className="text-white text-sm md:text-base font-semibold truncate">
                        {extra.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={closeGallery}
                      className="ml-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group"
                    >
                      <FaTimes className="text-white text-lg group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Main Image Area */}
                <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
                  <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center">
                    <img
                      src={currentImage}
                      alt={`${extra.title} - ${t("common.image")} ${galleryIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />

                    {/* Navigation Arrows */}
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1,
                        )
                      }
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white shadow-2xl items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
                    >
                      <FaChevronLeft className="text-wine text-xl" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white shadow-2xl items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
                    >
                      <FaChevronRight className="text-wine text-xl" />
                    </button>

                    {/* Mobile Navigation */}
                    <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1,
                          )
                        }
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all active:scale-95 backdrop-blur-sm"
                      >
                        <FaChevronLeft className="text-wine" />
                      </button>

                      <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm">
                        <span className="text-white text-sm font-semibold">
                          {galleryIndex + 1} / {images.length}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1,
                          )
                        }
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all active:scale-95 backdrop-blur-sm"
                      >
                        <FaChevronRight className="text-wine" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Thumbnails Bar */}
                <div className="bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-4">
                  <div className="max-w-7xl mx-auto">
                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-sage">
                          ${extra.price}
                        </span>
                        <span className="text-white/60 text-sm">USD</span>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                          {t("booking.addToBooking")}
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="w-5 h-5 text-wine focus:ring-wine rounded border-white/30 bg-white/10"
                          disabled={status === "submitting"}
                        />
                      </label>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {images.map((img, index) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setGalleryIndex(index)}
                          className={`
                            relative flex-shrink-0 rounded-lg overflow-hidden transition-all transform
                            ${
                              index === galleryIndex
                                ? "ring-3 ring-wine scale-105 shadow-xl shadow-wine/30"
                                : "ring-2 ring-white/20 hover:ring-white/40 opacity-60 hover:opacity-100"
                            }
                          `}
                        >
                          <img
                            src={img}
                            alt={`${t("common.thumbnail")} ${index + 1}`}
                            className="w-20 h-20 md:w-24 md:h-24 object-cover"
                          />
                          {index === galleryIndex && (
                            <div className="absolute inset-0 bg-wine/20 border-2 border-wine rounded-lg" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out;
        }

        .animate-slideInDown {
          animation: slideInDown 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const BookingPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BookingPageInner />
  </Suspense>
);

export default BookingPage;
