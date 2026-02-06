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
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";

interface FooterProps {
  variant?: "dark" | "beige";
}

const Footer = ({ variant = "dark" }: FooterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  const handleNav = (path: string) => {
    router.push(getLocalizedPath(path, currentLang));
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isActive = (path: string) => {
    return getLocalizedPath(pathname, "en") === path;
  };

  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-[#111111] text-white" : "bg-[#fffaf6] text-black";
  const borderClass = isDark ? "border-white/10" : "border-black/10";
  const mutedText = isDark ? "text-white/70" : "text-black/60";
  const linkHover = isDark ? "hover:text-white" : "hover:text-black";

  return (
    <footer className={`w-full min-h-screen flex flex-col ${bgClass}`}>
      <div className="w-full px-4 pt-14 pb-0 flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-4">
              {t("footer.linksTitle")}
            </h4>
            <ul className={`space-y-2 text-sm ${mutedText}`}>
              {[
                { name: t("footer.links.home"), path: "/" },
                { name: t("footer.links.book"), path: "/book" },
                { name: t("footer.links.services"), path: "/services" },
                { name: t("footer.links.contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNav(link.path)}
                    className={`${linkHover} transition-colors`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <p className={`mt-6 text-sm leading-relaxed ${mutedText}`}>
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-4">
              {t("footer.connectTitle")}
            </h4>
            <div className="flex gap-6 text-sm">
              <button
                onClick={() =>
                  openExternal("https://www.facebook.com/palmasrecovery/")
                }
                aria-label={t("footer.social.facebook")}
                className={`${mutedText} ${linkHover} transition-colors`}
              >
                Facebook
              </button>
              <button
                onClick={() =>
                  openExternal(
                    "https://www.instagram.com/palmasrecovery/?hl=es"
                  )
                }
                aria-label={t("footer.social.instagram")}
                className={`${mutedText} ${linkHover} transition-colors`}
              >
                Instagram
              </button>
              <button
                onClick={() =>
                  openExternal("https://www.tiktok.com/@palmasrecovery")
                }
                aria-label={t("footer.social.tiktok")}
                className={`${mutedText} ${linkHover} transition-colors`}
              >
                TikTok
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-4">
              {t("brand.available")}
            </h4>
            <p className={`text-sm ${mutedText}`}>{t("brand.roundTheClock")}</p>
            <div className={`mt-4 flex flex-col gap-2 text-xs ${mutedText}`}>
              <button
                onClick={() => handleNav("/privacy")}
                className={`${linkHover} transition-colors text-left`}
              >
                {t("footer.links.privacy")}
              </button>
              <button
                onClick={() => handleNav("/terms")}
                className={`${linkHover} transition-colors text-left`}
              >
                {t("footer.links.terms")}
              </button>
            </div>
          </div>
        </div>

        <div className={`w-full mt-3 pt-3 pb-3 border-t ${borderClass}`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-end gap-10">
            <div className="w-full md:w-[9200px] overflow-hidden rounded-2xl border border-white/10 md:ml-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1770341021986!6m8!1m7!1sN-CYaVYhfuwqmBIsa4VYVA!2m2!1d32.53180523214883!2d-117.0158720135962!3f121.88!4f0!5f0.7820865974627469"
                width="520"
                height="240"
                style={{ border: 0, width: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Palmas Recovery Map"
              />
            </div>

            <div className="w-full md:max-w-sm">
              <h4 className="text-sm uppercase tracking-[0.2em] mb-4">
                {t("footer.contactTitle")}
              </h4>
              <ul className={`space-y-2 text-sm ${mutedText}`}>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span>
                    {t("brand.address.line1")} {t("brand.address.line2")}{" "}
                    {t("brand.address.line3")} {t("brand.address.line4")}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone />
                  <button
                    onClick={() => (window.location.href = "tel:+16199679558")}
                    className={`${linkHover} transition-colors`}
                  >
                    +1 619-967-9558
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope />
                  <button
                    onClick={() =>
                      (window.location.href =
                        "mailto:palmasrecoveryspa@gmail.com")
                    }
                    className={`${linkHover} transition-colors`}
                  >
                    palmasrecoveryspa@gmail.com
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`w-full mt-auto border-t ${borderClass}`}>
          <div className="max-w-6xl mx-auto py-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <img
              src="/logo.png"
              alt={t("navbar.logoAlt")}
              className="h-32 md:h-40 w-auto"
            />
            <p className={`text-xs ${mutedText}`}>
              &copy; {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
