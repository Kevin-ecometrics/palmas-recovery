"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";

// Tipo para el payload del formulario
interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Función para enviar el formulario a la API
const sendContactForm = async (
  apiBaseUrl: string,
  payload: ContactFormPayload,
) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/contact`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función de validación del formulario
const validateForm = (
  payload: ContactFormPayload,
  t: (key: string) => string,
): string | null => {
  if (!payload.name) return t("contact.errors.nameRequired");
  if (!payload.email) return t("contact.errors.emailRequired");
  if (!payload.message) return t("contact.errors.messageRequired");

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) {
    return t("contact.errors.invalidEmail");
  }

  return null;
};

// Función para manejar errores de axios
const handleAxiosError = (
  error: unknown,
  t: (key: string) => string,
): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return t("contact.errors.timeout");
    }
    if (!error.response) {
      return t("contact.errors.network");
    }
    const serverError = (error.response?.data as { error?: string })?.error;
    return serverError || error.message || t("contact.errors.server");
  }

  if (error instanceof Error) {
    return error.message;
  }

  return t("contact.errors.unknown");
};

// Función principal para manejar el submit
const handleSubmitForm = async (
  event: React.FormEvent<HTMLFormElement>,
  message: string,
  setStatus: (status: "idle" | "sending" | "success" | "error") => void,
  setErrorText: (error: string | null) => void,
  setMessage: (message: string) => void,
  t: (key: string) => string,
  formRef: React.RefObject<HTMLFormElement | null>,
) => {
  event.preventDefault();

  try {
    // Obtener datos del formulario
    const formData = new FormData(event.currentTarget);
    const payload: ContactFormPayload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: message.trim(),
    };

    // Validar formulario
    const validationError = validateForm(payload, t);
    if (validationError) {
      setStatus("error");
      setErrorText(validationError);
      return;
    }

    setStatus("sending");
    setErrorText(null);

    // Configurar URL base
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    // Enviar formulario
    await sendContactForm(apiBaseUrl, payload);

    // Éxito - Resetear el formulario usando el ref
    setStatus("success");
    setMessage("");

    // Verificar que formRef.current existe antes de llamar a reset
    if (formRef.current) {
      formRef.current.reset();
    }
  } catch (error: unknown) {
    // Manejo detallado de errores
    setStatus("error");

    try {
      const errorMessage = handleAxiosError(error, t);
      setErrorText(errorMessage);
    } catch (handlingError) {
      // Si hay error al manejar el error
      console.error("Error handling error:", handlingError);
      setErrorText(t("contact.errors.unknown"));
    }
  }
};

const ContactPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const maxChars = 500;
  const { t } = useTranslation();

  // Crear una referencia al formulario
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="bg-white">
      <Navbar />
      <Hero
        title={t("bannerHero.contact.title")}
        description={t("bannerHero.contact.description")}
        height="h-[80dvh]"
      />
      <div className="min-h-screen bg-white py-20 px-6 md:px-20">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-wine mb-4">
            {t("contact.titleStart")}{" "}
            <span className="text-wine">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-olive-dark max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contenedor principal */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start max-w-6xl mx-auto mb-8">
          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full lg:w-2/3 border border-gray-200">
            <h3 className="text-xl font-semibold text-wine mb-6">
              {t("contact.formTitle")}
            </h3>

            <form
              ref={formRef}
              className="space-y-6"
              onSubmit={(event) =>
                handleSubmitForm(
                  event,
                  message,
                  setStatus,
                  setErrorText,
                  setMessage,
                  t,
                  formRef,
                )
              }
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-olive-dark mb-1">
                    {t("contact.fullName")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contact.namePlaceholder")}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wine outline-none text-olive-dark"
                    required
                    disabled={status === "sending"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-olive-dark mb-1">
                    {t("contact.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wine outline-none text-olive-dark"
                    required
                    disabled={status === "sending"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-olive-dark mb-1">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("contact.phonePlaceholder")}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wine outline-none text-olive-dark"
                  disabled={status === "sending"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-olive-dark mb-1">
                  {t("contact.message")} *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    // Limpiar error cuando el usuario empieza a escribir
                    if (status === "error") {
                      setStatus("idle");
                      setErrorText(null);
                    }
                  }}
                  name="message"
                  placeholder={t("contact.messagePlaceholder")}
                  maxLength={maxChars}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-wine outline-none resize-none text-olive-dark"
                  required
                  disabled={status === "sending"}
                />
                <div className="text-right text-sm text-olive-dark">
                  {message.length} / {maxChars}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-wine text-white font-medium py-3 rounded-md hover:bg-wine/90 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
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
                    <span>{t("contact.sending")}</span>
                  </>
                ) : (
                  <>
                    <span>➤</span>
                    {t("contact.send")}
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="text-sm text-sage bg-cream border border-sage/20 rounded-md p-3">
                  <p className="font-medium text-wine">
                    {t("contact.success")}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="text-sm text-wine bg-cream border border-wine/20 rounded-md p-3">
                  <p className="font-medium text-wine">Error:</p>
                  <p className="text-olive-dark">
                    {errorText || t("contact.error")}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Información de contacto */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-wine">
                {t("contact.infoTitle")}
              </h3>

              <div className="flex items-center gap-4 text-olive-dark">
                <FaPhone className="text-wine text-xl" />
                <div>
                  <p className="font-medium text-wine">
                    {t("brand.phoneLabel")}
                  </p>
                  <p className="text-sm text-olive-dark">+1 619-967-9558</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-olive-dark">
                <FaEnvelope className="text-wine text-xl" />
                <div>
                  <p className="font-medium text-wine">
                    {t("brand.emailLabel")}
                  </p>
                  <p className="text-sm text-olive-dark">
                    palmasrecoveryspa@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-olive-dark">
                <FaMapMarkerAlt className="text-wine text-xl" />
                <div>
                  <p className="font-medium text-wine">
                    {t("brand.locationLabel")}
                  </p>
                  <p className="text-sm text-olive-dark">
                    {t("brand.address.line1")} {t("brand.address.line2")}
                    <br />
                    {t("brand.address.line3")}, {t("brand.address.line4")}
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12088.580052987509!2d-117.023245165386!3d32.52914205537506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94932f905417b%3A0x6c8cc8c7050e7276!2sPalmas%20Recovery!5e0!3m2!1ses-419!2smx!4v1769628420070!5m2!1ses-419!2smx"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Palmas Recovery"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
