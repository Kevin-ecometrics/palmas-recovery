"use client";

import React, { useState, useEffect } from "react";
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

const BookingPageInner = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  useEffect(() => {
    const roomParam = searchParams.get("room");
    if (roomParam && ROOMS.some((r) => r.id === roomParam)) {
      setSelectedRoom(roomParam);
    }
  }, [searchParams]);

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [galleryExtraId, setGalleryExtraId] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
  });

  const extras = [
    {
      id: "b01g",
      title: "ORIGINAL RECOVERY BRA - STYLE NO. B01G",
      price: 80,
      images: [
        "/extra1-1.png", 
        "/extra1-2.png", 
        "/extra1-3.png", 
      ],
    },
    {
      id: "fvom",
      title: "OPEN BUST VEST - 3/4 LENGTH SLEEVES - STYLE NO. FVOM",
      price: 80,
      images: [
        "/extra2-1.png", 
        "/extra2-2.png", 
        "/extra2-3.png", 
      ],
    },
    {
      id: "sfbhrs",
      title:
        "REINFORCED GIRDLE WITH HIGH-BACK AND LAYERED PANELS - SHORT LENGTH - STYLES NO. SFBHRS",
      price: 140,
      images: [
        "/extra3-1.png", 
        "/Extra3-2.png", 
        "/extra3-3.png", 
      ],
    },
    {
      id: "sfbhs2",
      title:
        "GIRDLE WITH HIGH-BACK - NO CLOSURES - SHORT LENGHT - STYLE NO. SFBHS2",
      price: 140,
      images: [
        "/extra4-1.png", // Servicio extra 4, imagen 1
        "/extra4-2.png", // Servicio extra 4, imagen 2
        "/extra4-3.png", // Servicio extra 4, imagen 3
      ],
    },
  ];

  const selectedRoomData = selectedRoom
    ? ROOMS.find((r) => r.id === selectedRoom)
    : null;

  const getRoomText = (id: string, key: string) => t(`rooms.${id}.${key}`);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const calculateExtrasTotal = () => {
    return selectedExtras.reduce((total, id) => {
      const extra = extras.find((item) => item.id === id);
      return total + (extra?.price || 0);
    }, 0);
  };

  const calculateTotal = () => {
    if (!selectedRoomData || calculateNights() <= 0) return 0;
    const numberOfGuests = Number(formData.guests) || 1;
    const roomTotal = selectedRoomData.price * calculateNights() * numberOfGuests;
    return roomTotal + calculateExtrasTotal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      // Scroll to top immediately when changing steps
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      alert(t("booking.bookingComplete"));
      router.push("/");
    }
  };

  const handleNextClick = () => {
    if (step < 3 && canProceed()) {
      setStep(step + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedRoom !== null;
    if (step === 2) {
      return (
        formData.checkIn &&
        formData.checkOut &&
        formData.fullName &&
        formData.email &&
        formData.phone
      );
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      {/* Enhanced Progress Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm pt-24 md:pt-28 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between relative">
            {/* Background Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10" />
            <div
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-principal to-principal/80 rounded-full transition-all duration-700 ease-out -z-10"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />

            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center z-10">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    shadow-lg transition-all duration-500 transform
                    ${
                      step > num
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white scale-100"
                        : step === num
                        ? "bg-gradient-to-br from-principal to-principal/90 text-white scale-110 ring-4 ring-principal/30"
                        : "bg-white text-gray-400 border-2 border-gray-300 scale-90"
                    }
                  `}
                >
                  {step > num ? <FaCheck /> : num}
                </div>
                <span
                  className={`mt-3 text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    step >= num ? "text-gray-900" : "text-gray-400"
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
            {/* Enhanced Header */}
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("booking.title")}
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                {t("booking.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Enhanced Room Selection */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#70805A] to-[#5a6647] flex items-center justify-center">
                      <FaBed className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {t("booking.selectRoomTitle")}
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {ROOMS.map((room) => {
                      const isSelected = selectedRoom === room.id;
                      return (
                        <div key={room.id} className="space-y-0">
                          <div
                            onClick={() => setSelectedRoom(room.id)}
                            className={`
                              group relative overflow-hidden rounded-2xl cursor-pointer 
                              transition-all duration-500 transform hover:scale-[1.02]
                              ${
                                isSelected
                                  ? "ring-4 ring-[#70805A] shadow-2xl shadow-[#70805A]/20"
                                  : "ring-1 ring-gray-200 hover:ring-2 hover:ring-gray-300 hover:shadow-xl"
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
                                    
                                    {/* Indicador de Selección - Esquina Superior Derecha */}
                                    {isSelected && (
                                      <div className="absolute top-3 right-3 z-10 animate-scaleIn">
                                        <FaCheckCircle className="text-[#70805A] text-4xl drop-shadow-lg" />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="md:w-2/3 flex flex-col">
                                  <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                      <span className="inline-block bg-gradient-to-r from-principal to-principal/80 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
                                        {getRoomText(room.id, "highlight")}
                                      </span>
                                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                        {getRoomText(room.id, "name")}
                                      </h3>
                                      <p className="text-sm md:text-base text-gray-600 italic">
                                        {getRoomText(room.id, "tagline")}
                                      </p>
                                    </div>
                                    <div className="text-right ml-4">
                                      <div className="text-2xl md:text-3xl font-bold text-[#70805A]">
                                        ${room.price}
                                      </div>
                                      <div className="text-xs md:text-sm text-gray-500 font-medium">
                                        {t("booking.perNight")}
                                      </div>
                                    </div>
                                  </div>

                                  <p className="text-sm md:text-base text-gray-700 mb-5 line-clamp-2 md:line-clamp-none">
                                    {getRoomText(room.id, "description")}
                                  </p>

                                  {/* Features */}
                                  <div className="flex flex-wrap gap-3 md:gap-4 mt-auto">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                                      <FaUserFriends className="text-[#70805A]" />
                                      <span className="text-gray-700 font-medium">
                                        {t("searchBar.accommodates", {
                                          count: room.capacity,
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                                      <FaBath className="text-[#70805A]" />
                                      <span className="text-gray-700 font-medium">
                                        {room.id === "shared"
                                          ? t("searchBar.bathroom.shared")
                                          : t("searchBar.bathroom.private")}{" "}
                                        {t("searchBar.bathroomLabel")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                                      <MdMedicalServices className="text-[#70805A]" />
                                      <span className="text-gray-700 font-medium">
                                        {t("booking.assistance")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Next Button Below Selected Room */}
                          {isSelected && (
                            <div className="pt-4 animate-slideInUp">
                              <button
                                type="button"
                                onClick={handleNextClick}
                                className="w-full group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#70805A] to-[#5a6647] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#70805A]/40 transition-all duration-300 transform hover:scale-[1.02]"
                              >
                                {t("booking.next")}
                                <FaChevronRight className="transition-transform group-hover:translate-x-1" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Enhanced Details Form */}
              {step === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#70805A] to-[#5a6647] flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {t("booking.stayDetails")}
                    </h2>
                  </div>

                  {/* Dates and Guests */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FaCalendarAlt className="text-[#70805A]" />
                      Stay Information
                    </h3>
                    <div className="grid md:grid-cols-3 gap-5">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.checkIn")}
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={todayValue}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.checkOut")}
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || todayValue}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.guests")}
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300 appearance-none bg-white cursor-pointer"
                        >
                          {[1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                              {num} {t("common.guest", { count: num })}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FaUserFriends className="text-[#70805A]" />
                      {t("booking.detailsTitle")}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="md:col-span-2 group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.fullName")}
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("booking.fields.specialRequests")}
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder={t("booking.specialRequestsPlaceholder")}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-principal focus:border-principal transition-all duration-300 group-hover:border-gray-300 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Enhanced Payment & Confirmation */}
              {step === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#70805A] to-[#5a6647] flex items-center justify-center">
                      <FaCreditCard className="text-white text-lg" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {t("booking.confirmTitle")}
                    </h2>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {t("booking.summary")}
                    </h3>

                    {selectedRoomData && (
                      <div className="space-y-5">
                        <div className="flex items-center gap-4 pb-5 border-b-2 border-gray-200">
                          <img
                            src={selectedRoomData.image}
                            alt={getRoomText(selectedRoomData.id, "imageAlt")}
                            className="w-24 h-24 object-cover rounded-xl shadow-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {getRoomText(selectedRoomData.id, "name")}
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-2xl font-bold text-[#70805A]">
                                ${selectedRoomData.price}
                              </span>
                              <span className="text-sm text-gray-500">
                                {t("booking.perNight")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 py-4">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">
                              {t("booking.nights")}:
                            </span>
                            <span className="font-bold text-gray-900">
                              {calculateNights()}{" "}
                              {t("common.night", { count: calculateNights() })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">
                              {t("booking.guests")}:
                            </span>
                            <span className="font-bold text-gray-900">
                              {formData.guests}{" "}
                              {t("common.guest", {
                                count: Number(formData.guests),
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">
                              Room Subtotal:
                            </span>
                            <span className="font-bold text-gray-900">
                              ${selectedRoomData.price * calculateNights() * Number(formData.guests)}
                            </span>
                          </div>
                          {selectedExtras.length > 0 && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600 font-medium">
                                {t("booking.extras")}:
                              </span>
                              <span className="font-bold text-gray-900">
                                ${calculateExtrasTotal()}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">
                              {t("booking.period")}:
                            </span>
                            <span className="font-medium text-gray-900">
                              {formData.checkIn} → {formData.checkOut}
                            </span>
                          </div>
                        </div>

                        <div className="pt-5 border-t-2 border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold text-gray-900">
                              {t("booking.total")}:
                            </span>
                            <span className="text-3xl font-bold text-[#70805A]">
                              ${calculateTotal()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {t("booking.taxesIncluded")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recovery Garments */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🩺</span>
                        {t("booking.extras")}
                      </h3>
                      {selectedExtras.length > 0 && (
                        <span className="px-3 py-1 bg-[#70805A]/10 text-[#70805A] rounded-full text-sm font-semibold">
                          {selectedExtras.length} selected
                        </span>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {extras.map((extra) => {
                        const isChecked = selectedExtras.includes(extra.id);
                        return (
                          <div
                            key={extra.id}
                            className={`
                              relative group rounded-2xl overflow-hidden transition-all duration-300
                              ${
                                isChecked
                                  ? "ring-2 ring-[#70805A] shadow-lg shadow-[#70805A]/20"
                                  : "ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md"
                              }
                            `}
                          >
                            {isChecked && (
                              <div className="absolute top-3 right-3 z-10 bg-[#70805A] text-white rounded-full p-1.5 shadow-lg">
                                <FaCheck className="text-xs" />
                              </div>
                            )}

                            <div className="bg-white p-4">
                              <button
                                type="button"
                                onClick={() => openGallery(extra.id, 0)}
                                className="w-full mb-4 relative overflow-hidden rounded-xl group/img"
                              >
                                <img
                                  src={extra.images[0]}
                                  alt={extra.title}
                                  className="w-full h-48 object-cover transition-transform duration-500 group-hover/img:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                  <span className="text-white text-sm font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                    View Gallery
                                  </span>
                                </div>
                              </button>

                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                                  {extra.title}
                                </h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#70805A]">
                                    ${extra.price}
                                  </span>
                                  <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleExtra(extra.id)}
                                      className="w-5 h-5 text-[#70805A] focus:ring-[#70805A] rounded border-gray-300"
                                    />
                                    <span className="text-sm font-semibold text-gray-700 group-hover/checkbox:text-[#70805A] transition-colors">
                                      Add to booking
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FaCreditCard className="text-[#70805A]" />
                      {t("booking.paymentMethod")}
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          id: "credit-card",
                          label: t("booking.paymentCard"),
                          icon: "💳",
                        },
                        {
                          id: "bank-transfer",
                          label: t("booking.paymentTransfer"),
                          icon: "🏦",
                        },
                        {
                          id: "paypal",
                          label: t("booking.paymentPayPal"),
                          icon: "🔗",
                        },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`
                            flex flex-col items-center justify-center gap-3 p-5 rounded-xl cursor-pointer 
                            transition-all duration-300 transform hover:scale-105
                            ${
                              formData.paymentMethod === method.id
                                ? "ring-2 ring-[#70805A] bg-[#70805A]/5 shadow-lg"
                                : "ring-1 ring-gray-200 hover:ring-gray-300 bg-white"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span className="text-4xl">{method.icon}</span>
                          <span className="font-semibold text-sm text-center">
                            {method.label}
                          </span>
                          {formData.paymentMethod === method.id && (
                            <FaCheck className="text-[#70805A]" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 md:p-8 border border-blue-200 shadow-md">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <FaShieldAlt className="text-white" />
                      </div>
                      {t("booking.cancellationTitle")}
                    </h4>
                    <ul className="space-y-2.5 text-blue-900">
                      {(
                        t("booking.cancellationItems", {
                          returnObjects: true,
                        }) as string[]
                      ).map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FaCheck className="text-[#70805A] mt-1 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Enhanced Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t-2 border-gray-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setStep(step - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:border-[#70805A] hover:text-[#70805A] transition-all duration-300 transform hover:scale-105"
                  >
                    <FaChevronLeft className="transition-transform group-hover:-translate-x-1" />
                    {t("booking.back")}
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  disabled={!canProceed()}
                  className={`
                    group flex items-center justify-center gap-3 px-10 py-4 font-bold rounded-full 
                    transition-all duration-300 transform hover:scale-105 shadow-lg
                    ${
                      canProceed()
                        ? step < 3
                          ? "bg-gradient-to-r from-[#70805A] to-[#5a6647] text-white hover:shadow-[#70805A]/30 hover:shadow-2xl"
                          : "bg-gradient-to-r from-[#70805A] to-[#5a6647] text-white hover:shadow-[#70805A]/30 hover:shadow-2xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  {step < 3 ? (
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

          {/* Enhanced Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#70805A] to-[#5a6647] flex items-center justify-center">
                    <FaBed className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="font-bold text-white text-lg mb-1">
                          {getRoomText(selectedRoomData.id, "name")}
                        </h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">
                            ${selectedRoomData.price}
                          </span>
                          <span className="text-sm text-white/90">
                            {t("common.perNight")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {formData.checkIn && formData.checkOut && (
                      <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                        {[
                          {
                            label: t("booking.checkIn"),
                            value: formData.checkIn,
                          },
                          {
                            label: t("booking.checkOut"),
                            value: formData.checkOut,
                          },
                          {
                            label: t("booking.nights"),
                            value: calculateNights(),
                          },
                          { label: t("booking.guests"), value: formData.guests },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm text-gray-600 font-medium">
                              {item.label}:
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {t("booking.estimatedTotal")}:
                        </span>
                        <span className="text-2xl font-bold text-[#70805A]">
                          ${calculateTotal()}
                        </span>
                      </div>
                      {selectedExtras.length > 0 && (
                        <div className="mt-3 p-3 bg-[#70805A]/10 rounded-lg border border-[#70805A]/20">
                          <p className="text-xs font-semibold text-[#70805A] mb-2">
                            Recovery Garments Added:
                          </p>
                          {selectedExtras.map((id) => {
                            const extra = extras.find((item) => item.id === id);
                            if (!extra) return null;
                            return (
                              <div
                                key={extra.id}
                                className="flex justify-between items-center text-xs text-gray-700 mb-1"
                              >
                                <span className="truncate flex-1">
                                  {extra.title.substring(0, 30)}...
                                </span>
                                <span className="font-bold ml-2">
                                  ${extra.price}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {t("booking.taxesIncludedShort")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FaBed className="text-3xl text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      {t("booking.selectRoomHelper")}
                    </p>
                  </div>
                )}

                {/* Enhanced Benefits */}
                <div className="mt-8 pt-8 border-t-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-5 text-lg flex items-center gap-2">
                    <FaCheck className="text-[#70805A]" />
                    {t("booking.included")}
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        icon: MdMedicalServices,
                        text: t("roomDetail.medicalAssistance"),
                        color: "text-[#70805A]",
                      },
                      {
                        icon: FaUtensils,
                        text: t("roomDetail.allMeals"),
                        color: "text-[#70805A]",
                      },
                      {
                        icon: MdCleaningServices,
                        text: t("roomDetail.dailyCleaning"),
                        color: "text-[#70805A]",
                      },
                      {
                        icon: MdSupportAgent,
                        text: t("booking.personalizedSupport"),
                        color: "text-[#70805A]",
                      },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <benefit.icon
                          className={`text-xl ${benefit.color} flex-shrink-0`}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Contact Info */}
                <div className="mt-8 p-5 bg-gradient-to-br from-principal/10 to-principal/5 rounded-xl border border-principal/20">
                  <p className="text-sm text-gray-700 text-center">
                    <span className="font-semibold">
                      {t("roomDetail.needHelp")}
                    </span>{" "}
                    <Link
                      href={getLocalizedPath("/contact", currentLang)}
                      className="text-principal font-bold hover:underline inline-flex items-center gap-1 group"
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

      {/* Enhanced Modal Gallery */}
      {galleryExtraId && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fadeIn"
          onClick={closeGallery}
        >
          {(() => {
            const extra = extras.find((item) => item.id === galleryExtraId);
            if (!extra) return null;
            const images = extra.images;
            const currentImage = images[galleryIndex] || images[0];
            return (
              <div 
                className="w-full h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modern Header */}
                <div className="bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#70805A] text-xs font-bold uppercase tracking-wider">
                          Recovery Garment
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60 text-xs font-medium">
                          {galleryIndex + 1} of {images.length}
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
                    {/* Image */}
                    <img
                      src={currentImage}
                      alt={`${extra.title} - Image ${galleryIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />
                    
                    {/* Navigation Arrows - Desktop */}
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white shadow-2xl items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
                    >
                      <FaChevronLeft className="text-gray-900 text-xl" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white shadow-2xl items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
                    >
                      <FaChevronRight className="text-gray-900 text-xl" />
                    </button>

                    {/* Navigation Arrows - Mobile */}
                    <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1
                          )
                        }
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all active:scale-95 backdrop-blur-sm"
                      >
                        <FaChevronLeft className="text-gray-900" />
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
                            prev === images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all active:scale-95 backdrop-blur-sm"
                      >
                        <FaChevronRight className="text-gray-900" />
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
                        <span className="text-2xl font-bold text-[#70805A]">
                          ${extra.price}
                        </span>
                        <span className="text-white/60 text-sm">USD</span>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                          Add to booking
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="w-5 h-5 text-[#70805A] focus:ring-[#70805A] rounded border-white/30 bg-white/10"
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
                                ? "ring-3 ring-[#70805A] scale-105 shadow-xl shadow-[#70805A]/30"
                                : "ring-2 ring-white/20 hover:ring-white/40 opacity-60 hover:opacity-100"
                            }
                          `}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-20 h-20 md:w-24 md:h-24 object-cover"
                          />
                          {index === galleryIndex && (
                            <div className="absolute inset-0 bg-[#70805A]/20 border-2 border-[#70805A] rounded-lg" />
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

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
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