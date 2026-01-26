"use client";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (path: string) => {
    router.push(path);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <img
              src="/logo.png"
              alt="Palmas Recovery Logo"
              className="w-40 h-auto mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              Premier post-surgical recovery facility in Tijuana, providing
              exceptional care and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Book Today", path: "/book" },
                { name: "Services", path: "/services" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNav(link.path)}
                    className={`text-sm transition-colors ${
                      isActive(link.path)
                        ? "text-[#70805a] font-semibold"
                        : "text-gray-600 hover:text-[#70805a]"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-[#70805a] mt-1 flex-shrink-0" />
                <span>
                  Fray Servando Teresa de Mier 15-Interior 2 Zona Urbana Rio
                  Tijuana 22010 Tijuana, B.C.
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <FaPhone className="text-[#70805a] flex-shrink-0" />
                <button
                  onClick={() => (window.location.href = "tel:+16199679558")}
                  className="hover:text-[#70805a] transition-colors"
                >
                  +1 619-967-9558
                </button>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <FaEnvelope className="text-[#70805a] flex-shrink-0" />
                <button
                  onClick={() =>
                    (window.location.href =
                      "mailto:palmasrecoveryspa@gmail.com")
                  }
                  className="hover:text-[#70805a] transition-colors"
                >
                  palmasrecoveryspa@gmail.com
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() =>
                  openExternal("https://www.facebook.com/palmasrecovery/")
                }
                aria-label="Facebook"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebookF size={18} />
              </button>
              <button
                onClick={() =>
                  openExternal(
                    "https://www.instagram.com/palmasrecovery/?hl=es"
                  )
                }
                aria-label="Instagram"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram size={18} />
              </button>
              <button
                onClick={() =>
                  openExternal("https://www.tiktok.com/@palmasrecovery")
                }
                aria-label="TikTok"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-black hover:text-white hover:border-black transition-all duration-300 transform hover:scale-110"
              >
                <FaTiktok size={18} />
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#70805a]/10 to-[#8faa6f]/10 rounded-lg p-4 border border-[#70805a]/20">
              <p className="text-xs font-semibold text-[#70805a] mb-2">
                AVAILABLE 24/7
              </p>
              <p className="text-sm text-gray-700 font-medium">
                Round-the-clock care & support
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Palmas Recovery. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <button
                onClick={() => handleNav("/privacy")}
                className="hover:text-[#70805a] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNav("/terms")}
                className="hover:text-[#70805a] transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
