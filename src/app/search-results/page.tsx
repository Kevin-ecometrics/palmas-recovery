"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaBed,
  FaBath,
  FaArrowLeft,
  FaSpinner,
  FaShieldAlt,
  FaSearch,
  FaMinus,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getRouteByKey } from "@/i18n/routeMap";
import { logger } from "@/utils/logger";

// Tipos
interface Room {
  id: string;
  name: string;
  type: "shared" | "private" | "vip";
  price: number;
  description: string;
  capacity: number;
  beds: string;
  bathroom: "shared" | "private";
  image: string;
  amenities: string[];
  tag?: string;
  tagColor?: string;
}

interface AvailabilityResponse {
  [roomId: string]: boolean;
}

// Componente principal
const SearchResultsInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  // Obtener parámetros de búsqueda iniciales
  const roomType = searchParams.get("room");
  const initialGuests = parseInt(searchParams.get("guests") || "1");
  const initialDuration = parseInt(searchParams.get("duration") || "3");
  const promoCode = searchParams.get("promo") || "";

  // Estados
  const [loading, setLoading] = useState(true);
  const [availableRooms, setAvailableRooms] = useState<AvailabilityResponse>(
    {},
  );
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(roomType);
  const [searching, setSearching] = useState(false);

  // Estados para el selector de fechas
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempCheckIn, setTempCheckIn] = useState("");
  const [tempCheckOut, setTempCheckOut] = useState("");
  const [guests, setGuests] = useState(initialGuests);
  const [duration, setDuration] = useState(initialDuration);
  const [isClient, setIsClient] = useState(false);

  // ==================== FUNCIONES DE FECHAS CORREGIDAS ====================

  // Obtener la fecha actual en formato local YYYY-MM-DD sin problemas de zona horaria
  const getCurrentLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Obtener fecha de check-in base (considerando hora actual)
  const getBaseCheckInDate = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Crear fecha base (hoy)
    const checkInDate = new Date(now);

    // Si son las 14:00 o más, el check-in es mañana
    if (currentHour >= 14 || (currentHour === 13 && currentMinutes >= 0)) {
      checkInDate.setDate(checkInDate.getDate() + 1);
    }

    // Resetear hora a 00:00:00 para evitar problemas de zona horaria
    checkInDate.setHours(0, 0, 0, 0);

    return checkInDate;
  };

  // Formatear fecha a YYYY-MM-DD usando fecha local
  const formatDateToLocalYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calcular fechas basadas en duración
  const calculateDatesFromDuration = (days: number) => {
    const checkInDate = getBaseCheckInDate();

    // Fecha de check-out: check-in + días
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + days);
    checkOutDate.setHours(0, 0, 0, 0);

    return {
      checkIn: formatDateToLocalYYYYMMDD(checkInDate),
      checkOut: formatDateToLocalYYYYMMDD(checkOutDate),
    };
  };

  // Calcular duración entre dos fechas
  const calculateDurationBetweenDates = (
    startDateStr: string,
    endDateStr: string,
  ) => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Obtener fecha mínima para el input (hoy o mañana según hora)
  const getMinSelectableDate = () => {
    const today = new Date();
    const currentHour = today.getHours();

    // Si son más de 14 horas, la fecha mínima es mañana
    if (currentHour >= 14) {
      today.setDate(today.getDate() + 1);
    }

    return formatDateToLocalYYYYMMDD(today);
  };

  // Validar si una fecha es válida (no anterior a hoy/mañana según hora)
  const isValidCheckInDate = (dateStr: string) => {
    const minDate = getMinSelectableDate();
    return dateStr >= minDate;
  };

  // Formatear fecha para mostrar (ej: "mar 7 de abr")
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    // Crear fecha en UTC para evitar problemas de zona horaria
    const date = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)),
    );

    return date.toLocaleDateString(currentLang === "es" ? "es-MX" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  // ==================== EFECTOS ====================

  // Inicializar fechas
  useEffect(() => {
    setIsClient(true);
    const { checkIn: newCheckIn, checkOut: newCheckOut } =
      calculateDatesFromDuration(initialDuration);
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    setTempCheckIn(newCheckIn);
    setTempCheckOut(newCheckOut);
  }, [initialDuration]);

  // Cargar datos de habitaciones con traducciones
  useEffect(() => {
    import("../components/data/rooms.data").then(({ ROOMS }) => {
      const bookableRooms = ROOMS.filter(
        (room: any) => room.price !== null,
      ).map((room: any) => ({
        id: room.id,
        name: t(`rooms.${room.id}.name`),
        type: room.type,
        price: room.price,
        description: t(`rooms.${room.id}.description`),
        capacity: room.capacity || (room.id === "shared" ? 4 : 1),
        beds: t(`rooms.${room.id}.beds`),
        bathroom: (room.bathroom_type === "private" ? "private" : "shared") as
          | "shared"
          | "private",
        image: room.image,
        amenities: room.amenities || [
          t("common.wifi"),
          t("common.tv"),
          t("common.airConditioning"),
        ],
        tag: t(`rooms.${room.id}.tag`),
        tagColor: room.tagColor,
      }));
      setRoomsData(bookableRooms);
    });
  }, [t]);

  // Verificar disponibilidad
  const checkAvailability = async () => {
    if (!checkIn || !checkOut) return;

    setSearching(true);
    setLoading(true);
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await axios.post(`${apiBaseUrl}/api/bulk-availability`, {
        checkIn,
        checkOut,
        roomIds: roomsData.map((r) => r.id),
      });
      setAvailableRooms(response.data);
    } catch (error) {
      logger.error("Error checking availability:", error);
    } finally {
      setSearching(false);
      setLoading(false);
    }
  };

  // Buscar cuando cambien fechas o datos
  useEffect(() => {
    if (roomsData.length > 0 && checkIn && checkOut) {
      checkAvailability();
    }
  }, [roomsData, checkIn, checkOut]);

  // Actualizar duración cuando cambian las fechas manualmente
  useEffect(() => {
    if (checkIn && checkOut) {
      const newDuration = calculateDurationBetweenDates(checkIn, checkOut);
      if (newDuration > 0 && newDuration !== duration) {
        setDuration(newDuration);
      }
    }
  }, [checkIn, checkOut]);

  // ==================== MANEJADORES ====================

  // Manejar búsqueda con nuevas fechas
  const handleSearch = () => {
    if (tempCheckIn && tempCheckOut) {
      // Validar que la fecha de check-in no sea menor que la fecha mínima
      if (!isValidCheckInDate(tempCheckIn)) {
        const minDate = getMinSelectableDate();
        alert(
          `Check-in no puede ser antes del ${formatDateForDisplay(minDate)}`,
        );
        return;
      }

      // Validar que check-out sea después de check-in
      if (tempCheckOut <= tempCheckIn) {
        alert("La fecha de salida debe ser después de la fecha de entrada");
        return;
      }

      setCheckIn(tempCheckIn);
      setCheckOut(tempCheckOut);
      setShowDatePicker(false);
    }
  };

  // Manejar cambio de duración rápida
  const handleQuickDurationChange = (days: number) => {
    const { checkIn: newCheckIn, checkOut: newCheckOut } =
      calculateDatesFromDuration(days);
    setTempCheckIn(newCheckIn);
    setTempCheckOut(newCheckOut);
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    setDuration(days);
  };

  // Manejar cambio de fecha de check-in
  const handleTempCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setTempCheckIn(newCheckIn);

    // Si el check-out es menor o igual al nuevo check-in, actualizar check-out a check-in + 1 día
    if (tempCheckOut && tempCheckOut <= newCheckIn) {
      const newCheckOutDate = new Date(newCheckIn);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      const newCheckOut = formatDateToLocalYYYYMMDD(newCheckOutDate);
      setTempCheckOut(newCheckOut);

      // Actualizar la duración
      const newDuration = calculateDurationBetweenDates(
        newCheckIn,
        newCheckOut,
      );
      setDuration(newDuration);
    } else if (tempCheckOut && newCheckIn) {
      // Recalcular duración con las nuevas fechas
      const newDuration = calculateDurationBetweenDates(
        newCheckIn,
        tempCheckOut,
      );
      if (newDuration > 0) {
        setDuration(newDuration);
      }
    }
  };

  // Manejar cambio de fecha de check-out
  const handleTempCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value;
    setTempCheckOut(newCheckOut);

    // Recalcular duración con las nuevas fechas
    if (tempCheckIn && newCheckOut) {
      const newDuration = calculateDurationBetweenDates(
        tempCheckIn,
        newCheckOut,
      );
      if (newDuration > 0) {
        setDuration(newDuration);
      }
    }
  };

  // Manejar cambio de huéspedes
  const handleGuestsChange = (newGuests: number) => {
    if (newGuests >= 0 && newGuests <= 10) {
      setGuests(newGuests);
    }
  };

  // Manejar reserva
  const handleBookNow = (roomId: string) => {
    const finalGuests = guests < 0 ? 0 : guests;

    const params = new URLSearchParams({
      room: roomId,
      checkIn,
      checkOut,
      guests: finalGuests.toString(),
      promo: promoCode,
      step: "2",
    });
    router.push(`${getRouteByKey("book", currentLang)}?${params.toString()}`);
  };

  // Filtrar habitaciones
  const availableRoomsList = roomsData.filter(
    (room) => availableRooms[room.id] === true,
  );
  const unavailableRoomsList = roomsData.filter(
    (room) => availableRooms[room.id] === false,
  );

  // Renderizado condicional inicial
  if (!isClient) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-5xl text-wine mx-auto mb-4" />
            <p className="text-gray-500">Cargando...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-wine transition-colors mb-4 group"
            >
              <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
              <span>{t("searchResults.backToHome")}</span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-wine mb-2">
              {t("searchResults.title")}
            </h1>

            {/* Selector de fechas */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              {/* Fechas actuales */}
              <div className="flex flex-wrap items-center justify-start gap-4 mb-4">
                <div
                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <div className="flex items-center gap-2 bg-cream px-4 py-2 rounded-full">
                    <FaCalendarAlt className="text-wine" />
                    <span className="font-medium">
                      {checkIn && checkOut
                        ? `${formatDateForDisplay(checkIn)} - ${formatDateForDisplay(checkOut)}`
                        : "Seleccionar fechas"}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>
                      {duration}{" "}
                      {duration === 1
                        ? t("common.night")
                        : t("common.nights", { count: duration })}
                    </span>
                  </div>
                  <FaSearch className="text-wine" />
                   <span className="text-sm text-gray-500">
                     {showDatePicker ? t("common.close") : t("common.edit")}
                   </span>
                 </div>

                 {/* Guest selector */}
                 <div className="flex items-center gap-2 bg-cream px-4 py-2 rounded-full">
                   <FaUser className="text-wine" />
                   <button
                     type="button"
                     onClick={() => handleGuestsChange(Math.max(0, guests - 1))}
                     disabled={guests <= 0}
                     className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                   >
                     <FaMinus size={8} />
                   </button>
                   <span className="font-medium text-sm">
                     {guests} {guests === 1 ? t("common.guest") : t("common.guests")}
                   </span>
                   <button
                     type="button"
                     onClick={() => handleGuestsChange(Math.min(1, guests + 1))}
                     disabled={guests >= 1}
                     className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                   >
                     <FaPlus size={8} />
                   </button>
                 </div>
               </div>

              {/* Panel de selección de fechas */}
              {showDatePicker && (
                <div className="border-t border-gray-200 pt-4 mt-2 animate-fadeIn">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-olive-dark mb-2">
                        {t("booking.fields.checkIn")}
                      </label>
                      <input
                        type="date"
                        value={tempCheckIn}
                        onChange={handleTempCheckInChange}
                        min={getMinSelectableDate()}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-olive-dark mb-2">
                        {t("booking.fields.checkOut")}
                      </label>
                      <input
                        type="date"
                        value={tempCheckOut}
                        onChange={handleTempCheckOutChange}
                        min={tempCheckIn || getMinSelectableDate()}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-wine focus:border-wine"
                      />
                    </div>
                  </div>

                  {/* Preview de fechas seleccionadas */}
                  {tempCheckIn && tempCheckOut && (
                    <div className="text-sm text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Fechas seleccionadas:</span>{" "}
                      {formatDateForDisplay(tempCheckIn)} →{" "}
                      {formatDateForDisplay(tempCheckOut)} ({duration}{" "}
                      {duration === 1 ? "noche" : "noches"})
                    </div>
                  )}

                  {/* Opciones rápidas de duración */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[1, 2, 3, 4, 5, 7].map((days) => {
                      const {
                        checkIn: previewCheckIn,
                        checkOut: previewCheckOut,
                      } = calculateDatesFromDuration(days);
                      const isSelected = duration === days;

                      return (
                        <button
                          key={days}
                          onClick={() => handleQuickDurationChange(days)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-wine text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {days}{" "}
                          {days === 1
                            ? t("common.night")
                            : t("common.nights", { count: days })}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSearch}
                      disabled={!tempCheckIn || !tempCheckOut}
                      className="flex-1 bg-wine text-white py-3 rounded-xl font-semibold hover:bg-wine/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("searchResults.updateSearch")}
                    </button>
                    <button
                      onClick={() => {
                        setShowDatePicker(false);
                        setTempCheckIn(checkIn);
                        setTempCheckOut(checkOut);
                        setDuration(
                          calculateDurationBetweenDates(checkIn, checkOut),
                        );
                      }}
                      className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {t("common.cancel")}
                    </button>
                  </div>
                </div>
              )}

              {promoCode && (
                <div className="flex items-center gap-2 bg-sage/10 px-4 py-2 rounded-full mt-4 w-fit">
                  <span className="text-sage font-medium">
                    {t("searchResults.promo")}:
                  </span>
                  <span>{promoCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resultados */}
          {loading ? (
            <div className="text-center py-20">
              <FaSpinner className="animate-spin text-4xl text-wine mx-auto mb-4" />
              <p className="text-gray-500">
                {t("searchResults.checkingAvailability")}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Habitaciones Disponibles */}
              {availableRoomsList.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {t("searchResults.available")} ({availableRoomsList.length})
                  </h2>
                  <div className="space-y-4">
                    {availableRoomsList.map((room) => (
                      <RoomCard
                        key={room.id}
                        room={room}
                        duration={duration}
                        guests={guests}
                        totalPrice={room.price * duration}
                        isSelected={selectedRoom === room.id}
                        onSelect={() => setSelectedRoom(room.id)}
                        onBook={() => handleBookNow(room.id)}
                        t={t}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                  <FaBed className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {t("searchResults.noRoomsAvailable")}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t("searchResults.noRoomsMessage")}
                  </p>
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="inline-flex items-center gap-2 bg-wine text-white px-6 py-3 rounded-full hover:bg-wine/90 transition-colors"
                  >
                    <FaCalendarAlt />
                    {t("searchResults.tryOtherDates")}
                  </button>
                </div>
              )}

              {/* Habitaciones No Disponibles */}
              {unavailableRoomsList.length > 0 &&
                availableRoomsList.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-lg font-medium text-gray-500 mb-4">
                      {t("searchResults.notAvailable")}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 opacity-60">
                      {unavailableRoomsList.slice(0, 2).map((room) => (
                        <div
                          key={room.id}
                          className="bg-white rounded-xl p-4 border border-gray-200"
                        >
                          <div className="flex gap-4">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-600">
                                {room.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {room.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <FaBed className="text-gray-300 text-sm" />
                                <span className="text-xs text-gray-400">
                                  {room.capacity}{" "}
                                  {t("common.guests", { count: room.capacity })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

// Componente de tarjeta de habitación
const RoomCard = ({
  room,
  duration,
  guests,
  totalPrice,
  isSelected,
  onSelect,
  onBook,
  t,
}: {
  room: Room;
  duration: number;
  guests: number;
  totalPrice: number;
  isSelected: boolean;
  onSelect: () => void;
  onBook: () => void;
  t: (key: string, options?: any) => string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getRoomIcon = () => {
    switch (room.type) {
      case "shared":
        return <FaUserFriends className="text-wine" />;
      case "vip":
        return <FaShieldAlt className="text-wine" />;
      default:
        return <FaBed className="text-wine" />;
    }
  };

  const getCapacityText = () => {
    if (room.capacity === 1) return `1 ${t("common.guest")}`;
    return `${room.capacity} ${t("common.guests", { count: room.capacity })}`;
  };

  const getBathroomText = () => {
    return room.bathroom === "private"
      ? t("searchBar.bathroom.private")
      : t("searchBar.bathroom.shared");
  };

  return (
    <div
      className={`
        group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
        transition-all duration-300 border-2
        ${isSelected ? "border-wine shadow-lg" : "border-transparent hover:border-gray-200"}
      `}
    >
      <div className="flex flex-col md:flex-row">
        {/* Imagen */}
        <div className="md:w-72 relative overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="animate-spin text-wine text-2xl" />
            </div>
          )}
          <img
            src={room.image}
            alt={room.name}
            className={`
              w-full h-56 md:h-full object-cover transition-transform duration-500
              group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setImageLoaded(true)}
          />
          {room.tag && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${room.tagColor || "bg-wine"}`}
            >
              {room.tag}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getRoomIcon()}
                <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-wine">
                  ${room.price}
                </div>
                <div className="text-xs text-gray-400">
                  {t("common.perNight")}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {room.description}
            </p>

            {/* Características */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaUserFriends />
                <span>{getCapacityText()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaBath />
                <span>
                  {getBathroomText()} {t("searchBar.bathroomLabel")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaBed />
                <span>{room.beds}</span>
              </div>
            </div>

            {/* Amenidades */}
            <div className="flex flex-wrap gap-2 mb-6">
              {room.amenities.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                >
                  {amenity}
                </span>
              ))}
            </div>

            {/* Footer con precio y botón */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <div className="text-sm text-gray-500">
                  {t("searchResults.totalFor")} {duration}{" "}
                  {duration === 1
                    ? t("common.night")
                    : t("common.nights", { count: duration })}
                </div>
                <div className="text-2xl font-bold text-wine">
                  ${totalPrice}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onSelect}
                  className={`
                    px-5 py-2 rounded-full font-medium transition-all
                    ${isSelected ? "bg-wine text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
                  `}
                >
                  {isSelected
                    ? t("searchResults.selected")
                    : t("searchResults.select")}
                </button>
                <button
                  onClick={onBook}
                  className="px-6 py-2 bg-wine text-white rounded-full font-semibold hover:bg-wine/90 transition-all hover:shadow-lg"
                >
                  {t("searchResults.bookNow")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente con Suspense
const SearchResultsPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-wine" />
      </div>
    }
  >
    <SearchResultsInner />
  </Suspense>
);

export default SearchResultsPage;
