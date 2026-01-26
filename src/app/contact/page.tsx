"use client";
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const maxChars = 500;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-principalto-white py-20 px-6 md:px-20">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-gray-900 mb-4">
            Let’s <span className="text-principal">Connect</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you. Send us a message and we’ll respond as
            soon as possible.
          </p>
        </div>

        {/* Contenedor principal */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start max-w-6xl mx-auto mb-8">
          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full lg:w-2/3">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-principal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help you..."
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
                className="w-full bg-principal text-white font-medium py-3 rounded-md hover:bg-principal transition flex items-center justify-center gap-2"
              >
                <span>➤</span> Send Message
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h3>

              <div className="flex items-center gap-4 text-gray-700">
                <FaPhone className="text-principal text-xl" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm">+1 619-967-9558</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <FaEnvelope className="text-principal text-xl" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">palmasrecoveryspa@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <FaMapMarkerAlt className="text-principal text-xl" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm">
                    Fray Servando Teresa de Mier 15 - Interior 2
                    <br />
                    Zona Urbana Río, Tijuana, B.C.
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.590066209535!2d-117.0109032!3d32.5253886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d949a52b4f2a03%3A0x37d02f82b0d5c2f1!2sPalmas%20Recovery!5e0!3m2!1sen!2smx!4v1699120000000!5m2!1sen!2smx"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
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
