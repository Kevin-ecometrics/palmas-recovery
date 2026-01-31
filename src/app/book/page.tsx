"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaCreditCard,
  FaShieldAlt,
  FaUtensils,
  FaBed,
  FaBath,
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

const BookingPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [galleryExtraId, setGalleryExtraId] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
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
      // link: "https://marena.com/collections/recovery-bras/products/original-recovery-bra-style-no-b01g",
      images: ["/extra1-1.png", "/extra1-2.png", "/extra1-3.png"],
    },
    {
      id: "fvom",
      title: "OPEN BUST VEST - 3/4 LENGTH SLEEVES - STYLE NO. FVOM",
      price: 80,
      // link: "https://marena.com/products/fvom-compression-vest?_pos=1&_sid=06fdccf3c&_ss=r",
      images: ["/extra2-1.png", "/extra2-2.png", "/extra2-3.png"],
    },
    {
      id: "sfbhrs",
      title:
        "REINFORCED GIRDLE WITH HIGH-BACK AND LAYERED PANELS - SHORT LENGTH - STYLES NO. SFBHRS",
      price: 140,
      // link: "https://marena.com/products/girdle-with-high-back-and-reinforced-panels-short-length-style-no-sfbhs?_pos=1&_sid=54cd26453&_ss=r&variant=39327118655511",
      images: ["/extra3-1.png", "/Extra3-2.png", "/extra3-3.png"],
    },
    {
      id: "sfbhs2",
      title: "GIRDLE WITH HIGH-BACK - NO CLOSURES - SHORT LENGHT - STYLE NO. SFBHS2",
      price: 140,
      // link: "https://marena.com/products/sfbhs2-compression-girdle?_pos=1&_sid=76a7163d2&_ss=r&variant=14424290918442",
      images: ["/extra4-1.png", "/extra4-2.png", "/extra4.3.png"],
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
    return selectedRoomData.price * calculateNights() + calculateExtrasTotal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Aquí iría la lógica de envío del formulario
      alert(t("booking.bookingComplete"));
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${
                      step >= num
                        ? "bg-principal text-white"
                        : "bg-gray-200 text-gray-400"
                    }
                    transition-all duration-300
                  `}
                  >
                    {num}
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    {num === 1
                      ? t("booking.steps.select")
                      : num === 2
                      ? t("booking.steps.details")
                      : t("booking.steps.confirm")}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step > num ? "bg-principal" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
              {t("booking.title")}
            </h1>
            <p className="text-gray-600 mb-10">
              {t("booking.subtitle")}
            </p>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Room Selection */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FaBed className="text-principal" />
                    {t("booking.selectRoomTitle")}
                  </h2>

                  <div className="space-y-6">
                    {ROOMS.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`
                          border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300
                          ${
                            selectedRoom === room.id
                              ? "border-principal bg-principal/5"
                              : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3">
                            <img
                              src={room.image}
                              alt={getRoomText(room.id, "imageAlt")}
                              className="w-full h-48 object-cover rounded-xl"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="bg-principal text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {getRoomText(room.id, "highlight")}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {getRoomText(room.id, "subtitle")}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                  {getRoomText(room.id, "name")}
                                </h3>
                                <p className="text-gray-600 italic mb-3">
                                  {getRoomText(room.id, "tagline")}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold">
                                  ${room.price}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  {t("booking.perNight")}
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">
                              {getRoomText(room.id, "description")}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FaUserFriends />
                                <span>
                                  {t("searchBar.accommodates", {
                                    count: room.capacity,
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaBath />
                                <span>
                                  {room.id === "shared"
                                    ? t("searchBar.bathroom.shared")
                                    : t("searchBar.bathroom.private")}{" "}
                                  {t("searchBar.bathroomLabel")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MdMedicalServices />
                                <span>{t("booking.assistance")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FaCalendarAlt className="text-principal" />
                    {t("booking.stayDetails")}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.fields.checkIn")}
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.fields.checkOut")}
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.fields.guests")}
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {t("common.guest", { count: num })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {t("booking.detailsTitle")}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("booking.fields.fullName")}
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("booking.fields.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("booking.fields.phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("booking.fields.specialRequests")}
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                        placeholder={t("booking.specialRequestsPlaceholder")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment & Confirmation */}
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FaCreditCard className="text-principal" />
                    {t("booking.confirmTitle")}
                  </h2>

                  <div className="bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {t("booking.summary")}
                    </h3>

                    {selectedRoomData && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {getRoomText(selectedRoomData.id, "name")}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {getRoomText(selectedRoomData.id, "subtitle")}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              ${selectedRoomData.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              {t("booking.perNight")}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t("booking.nights")}:</span>
                            <span className="font-medium">
                              {calculateNights()} {t("common.night", { count: calculateNights() })}
                            </span>
                          </div>
                          {selectedExtras.length > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("booking.extras")}:</span>
                              <span className="font-medium">
                                ${calculateExtrasTotal()}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t("booking.guests")}:</span>
                            <span className="font-medium">
                              {formData.guests} {t("common.guest", { count: Number(formData.guests) })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t("booking.period")}:</span>
                            <span className="font-medium">
                              {formData.checkIn} {t("booking.to")} {formData.checkOut}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between text-lg font-bold">
                            <span>{t("booking.total")}:</span>
                            <span>${calculateTotal()}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {t("booking.taxesIncluded")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {t("booking.extras")}
                    </h3>
                    <div className="space-y-6">
                      {extras.map((extra) => {
                        const isChecked = selectedExtras.includes(extra.id);
                        return (
                          <div
                            key={extra.id}
                            className="border border-gray-200 rounded-2xl p-4 md:p-5"
                          >
                            <div className="grid md:grid-cols-[140px_1fr_auto] gap-4 items-start">
                              <button
                                type="button"
                                onClick={() => openGallery(extra.id, 0)}
                                className="text-left"
                              >
                                <div className="space-y-2">
                                  <img
                                    src={extra.images[0]}
                                    alt={extra.title}
                                    className="w-full h-24 rounded-xl object-cover border border-cream"
                                  />
                                </div>
                              </button>

                              <div className="space-y-2">
                                <p className="font-semibold text-gray-900 text-sm md:text-base leading-snug break-words">
                                  {extra.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {t("booking.extrasPrice")}: {" "}
                                  <span className="font-semibold">
                                    ${extra.price} USD
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500">
                                  {t("booking.extrasViewGallery")}
                                </p>
                              </div>

                              <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleExtra(extra.id)}
                                  className="mt-1 h-4 w-4 text-principal focus:ring-principal"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                  {t("booking.extrasAdd")}
                                </span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {t("booking.paymentMethod")}
                    </h3>

                    <div className="space-y-4">
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
                        { id: "paypal", label: t("booking.paymentPayPal"), icon: "🔗" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`
                            flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all
                            ${
                              formData.paymentMethod === method.id
                                ? "border-principal bg-principal/5"
                                : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="text-principal focus:ring-principal"
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-medium">{method.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <FaShieldAlt className="text-blue-600" />
                      {t("booking.cancellationTitle")}
                    </h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      {(t("booking.cancellationItems", {
                        returnObjects: true,
                      }) as string[]).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:border-gray-400 transition-all"
                  >
                    ← {t("booking.back")}
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  className={`
                    px-12 py-4 font-bold rounded-full transition-all
                    ${
                      step < 3
                        ? "bg-principal text-white hover:bg-principal/90"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }
                  `}
                >
                  {step < 3
                    ? `${t("booking.next")} →`
                    : `${t("booking.confirmBooking")} ✅`}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("booking.summary")}
                </h3>

                {selectedRoomData ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedRoomData.image}
                        alt={getRoomText(selectedRoomData.id, "imageAlt")}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {getRoomText(selectedRoomData.id, "name")}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {getRoomText(selectedRoomData.id, "subtitle")}
                        </p>
                        <div className="text-lg font-bold text-principal">
                          ${selectedRoomData.price} {t("common.perNight")}
                        </div>
                      </div>
                    </div>

                    {formData.checkIn && formData.checkOut && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {t("booking.checkIn")}:
                          </span>
                          <span className="font-medium">
                            {formData.checkIn}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {t("booking.checkOut")}:
                          </span>
                          <span className="font-medium">
                            {formData.checkOut}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {t("booking.nights")}:
                          </span>
                          <span className="font-medium">
                            {calculateNights()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {t("booking.guests")}:
                          </span>
                          <span className="font-medium">{formData.guests}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t">
                      <div className="flex justify-between text-lg font-bold mb-2">
                        <span>{t("booking.estimatedTotal")}:</span>
                        <span>${calculateTotal()}</span>
                      </div>
                      {selectedExtras.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          {selectedExtras.map((id) => {
                            const extra = extras.find((item) => item.id === id);
                            if (!extra) return null;
                            return (
                              <div key={extra.id} className="flex justify-between">
                                <span className="truncate">{extra.title}</span>
                                <span>${extra.price}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <p className="text-sm text-gray-500">
                        {t("booking.taxesIncludedShort")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {t("booking.selectRoomHelper")}
                    </p>
                  </div>
                )}

                {/* Benefits */}
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-bold text-gray-900 mb-4">
                    {t("booking.included")}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MdMedicalServices className="text-principal" />
                      <span className="text-sm">{t("roomDetail.medicalAssistance")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUtensils className="text-principal" />
                      <span className="text-sm">
                        {t("roomDetail.allMeals")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdCleaningServices className="text-principal" />
                      <span className="text-sm">
                        {t("roomDetail.dailyCleaning")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdSupportAgent className="text-principal" />
                      <span className="text-sm">{t("booking.personalizedSupport")}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 p-4 bg-principal/10 rounded-xl">
                  <p className="text-sm text-gray-700">
                    {t("roomDetail.needHelp")} {" "}
                    <Link
                      href={getLocalizedPath("/contact", currentLang)}
                      className="text-principal font-semibold hover:underline"
                    >
                      {t("common.contactUs")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {galleryExtraId && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          {(() => {
            const extra = extras.find((item) => item.id === galleryExtraId);
            if (!extra) return null;
            const images = extra.images;
            const currentImage = images[galleryIndex] || images[0];

            return (
              <div className="bg-white rounded-3xl shadow-2xl w-[90vw] max-w-3xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-2 bg-gradient-to-r from-[#fffaf6] to-white border-b">
                  <div className="flex-1 text-center">
                    <p className="font-semibold text-gray-900 text-[10px] md:text-xs uppercase tracking-[0.15em]">
                      {t("booking.productGallery")}
                    </p>
                    <p className="text-gray-700 text-[11px] md:text-xs text-center max-w-2xl leading-snug break-words mx-auto">
                      {extra.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeGallery}
                    className="ml-4 text-gray-500 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="relative bg-white">
                  <img
                    src={currentImage}
                    alt={extra.title}
                    className="w-full h-[70vh] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setGalleryIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setGalleryIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
                  >
                    ›
                  </button>
                </div>

                <div className="px-6 py-4 border-t">
                  <div className="flex gap-3 justify-center overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setGalleryIndex(index)}
                        className={`border rounded-xl p-1 flex-shrink-0 transition ${
                          index === galleryIndex
                            ? "border-principal"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${extra.title} ${index + 1}`}
                          className="w-24 h-18 object-cover rounded-lg"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BookingPage;
