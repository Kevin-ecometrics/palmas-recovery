"use client";
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const ContactPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState<string | null>(null);
  const maxChars = 500;
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-principalto-white py-20 px-6 md:px-20">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-4">
            {t("contact.titleStart")} {" "}
            <span className="text-principal">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contenedor principal */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start max-w-6xl mx-auto mb-8">
          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full lg:w-2/3">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {t("contact.formTitle")}
            </h3>

            <form
              className="space-y-6"
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const payload = {
                  name: String(formData.get("name") || "").trim(),
                  email: String(formData.get("email") || "").trim(),
                  phone: String(formData.get("phone") || "").trim(),
                  message: message.trim(),
                };

                setStatus("sending");
                setErrorText(null);

                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data?.error || "Failed to send message.");
                  }

                  setStatus("success");
                  setMessage("");
                  event.currentTarget.reset();
                } catch (error) {
                  setStatus("error");
                  setErrorText(
                    error instanceof Error
                      ? error.message
                      : "Failed to send message."
                  );
                }
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.fullName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contact.namePlaceholder")}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                    name="phone"
                  placeholder={t("contact.phonePlaceholder")}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.message")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  placeholder={t("contact.messagePlaceholder")}
                  maxLength={maxChars}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none resize-none"
                  required
                />
                <div className="text-right text-sm text-gray-500">
                  {message.length} / {maxChars}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-principal text-white font-medium py-3 rounded-md hover:bg-principal transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>➤</span>
                {status === "sending" ? t("contact.sending") : t("contact.send")}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
                  {t("contact.success")}
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
                  {errorText || t("contact.error")}
                </p>
              )}
            </form>
          </div>

          {/* Información de contacto */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {t("contact.infoTitle")}
              </h3>

              <div className="flex items-center gap-4 text-gray-700">
                <FaPhone className="text-principal text-xl" />
                <div>
                  <p className="font-medium">{t("brand.phoneLabel")}</p>
                  <p className="text-sm">+1 619-967-9558</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <FaEnvelope className="text-principal text-xl" />
                <div>
                  <p className="font-medium">{t("brand.emailLabel")}</p>
                  <p className="text-sm">palmasrecoveryspa@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <FaMapMarkerAlt className="text-principal text-xl" />
                <div>
                  <p className="font-medium">{t("brand.locationLabel")}</p>
                  <p className="text-sm">
                    {t("brand.address.line1")} {t("brand.address.line2")}
                    <br />
                    {t("brand.address.line3")}, {t("brand.address.line4")}
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12088.580052987509!2d-117.023245165386!3d32.52914205537506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d94932f905417b%3A0x6c8cc8c7050e7276!2sPalmas%20Recovery!5e0!3m2!1ses-419!2smx!4v1769628420070!5m2!1ses-419!2smx"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
