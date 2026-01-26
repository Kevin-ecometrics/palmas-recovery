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

const BookingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
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

  const selectedRoomData = selectedRoom
    ? ROOMS.find((r) => r.id === selectedRoom)
    : null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoomData || calculateNights() <= 0) return 0;
    return selectedRoomData.price * calculateNights();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Aquí iría la lógica de envío del formulario
      alert("¡Reserva completada! Te contactaremos para confirmar.");
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
                      ? "Seleccionar"
                      : num === 2
                      ? "Detalles"
                      : "Confirmar"}
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
              Reserva tu Estancia
            </h1>
            <p className="text-gray-600 mb-10">
              Completa los detalles para reservar tu espacio de recuperación.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Room Selection */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FaBed className="text-principal" />
                    Selecciona tu Habitación
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
                              alt={room.imageAlt}
                              className="w-full h-48 object-cover rounded-xl"
                            />
                          </div>
                          <div className="md:w-2/3">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="bg-principal text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {room.highlight}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {room.subtitle}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                  {room.name}
                                </h3>
                                <p className="text-gray-600 italic mb-3">
                                  {room.tagline}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold">
                                  ${room.price}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  por noche
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">
                              {room.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FaUserFriends />
                                <span>
                                  {room.capacity} persona
                                  {room.capacity > 1 ? "s" : ""}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaBath />
                                <span>
                                  {room.amenities.includes("Private Bathroom")
                                    ? "Baño privado"
                                    : "Baño compartido"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MdMedicalServices />
                                <span>Asistencia 24/7</span>
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
                    Detalles de la Reserva
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Ingreso
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
                        Fecha de Salida
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
                        Número de Huéspedes
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "persona" : "personas"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Información Personal
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Completo
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
                          Email
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
                          Teléfono
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
                        Solicitudes Especiales (opcional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-principal focus:border-transparent"
                        placeholder="Alergias alimentarias, necesidades médicas específicas, etc."
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
                    Confirmación y Pago
                  </h2>

                  <div className="bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Resumen de la Reserva
                    </h3>

                    {selectedRoomData && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {selectedRoomData.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {selectedRoomData.subtitle}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              ${selectedRoomData.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              por noche
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Noches:</span>
                            <span className="font-medium">
                              {calculateNights()} noches
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Huéspedes:</span>
                            <span className="font-medium">
                              {formData.guests} persona
                              {formData.guests !== "1" ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Período:</span>
                            <span className="font-medium">
                              {formData.checkIn} a {formData.checkOut}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${calculateTotal()}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Impuestos y servicios incluidos
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Método de Pago
                    </h3>

                    <div className="space-y-4">
                      {[
                        {
                          id: "credit-card",
                          label: "Tarjeta de Crédito/Débito",
                          icon: "💳",
                        },
                        {
                          id: "bank-transfer",
                          label: "Transferencia Bancaria",
                          icon: "🏦",
                        },
                        { id: "paypal", label: "PayPal", icon: "🔗" },
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
                      Política de Cancelación
                    </h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>
                        • Cancelación gratuita hasta 48 horas antes del ingreso
                      </li>
                      <li>
                        • Reembolso del 50% por cancelaciones dentro de las 48
                        horas
                      </li>
                      <li>
                        • Se requiere depósito del 30% para confirmar la reserva
                      </li>
                      <li>
                        • Política de no-show: cargo completo de la estadía
                      </li>
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
                    ← Volver
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
                  {step < 3 ? "Continuar →" : "Confirmar Reserva ✅"}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Resumen
                </h3>

                {selectedRoomData ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedRoomData.image}
                        alt={selectedRoomData.imageAlt}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {selectedRoomData.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {selectedRoomData.subtitle}
                        </p>
                        <div className="text-lg font-bold text-principal">
                          ${selectedRoomData.price}/noche
                        </div>
                      </div>
                    </div>

                    {formData.checkIn && formData.checkOut && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Entrada:</span>
                          <span className="font-medium">
                            {formData.checkIn}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Salida:</span>
                          <span className="font-medium">
                            {formData.checkOut}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Noches:</span>
                          <span className="font-medium">
                            {calculateNights()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Huéspedes:</span>
                          <span className="font-medium">{formData.guests}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t">
                      <div className="flex justify-between text-lg font-bold mb-2">
                        <span>Total estimado:</span>
                        <span>${calculateTotal()}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Impuestos incluidos
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Selecciona una habitación para ver el resumen
                    </p>
                  </div>
                )}

                {/* Benefits */}
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Incluido en tu estadía:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MdMedicalServices className="text-principal" />
                      <span className="text-sm">Asistencia médica 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUtensils className="text-principal" />
                      <span className="text-sm">
                        Todas las comidas incluidas
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdCleaningServices className="text-principal" />
                      <span className="text-sm">
                        Limpieza diaria profesional
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdSupportAgent className="text-principal" />
                      <span className="text-sm">Soporte personalizado</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 p-4 bg-principal/10 rounded-xl">
                  <p className="text-sm text-gray-700">
                    ¿Necesitas ayuda?{" "}
                    <Link
                      href="/contact"
                      className="text-principal font-semibold hover:underline"
                    >
                      Contáctanos
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
