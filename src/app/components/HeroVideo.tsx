"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { getLocalizedPath } from "@/i18n/routeMap";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const currentLanguage = i18n.language?.startsWith("es") ? "es" : "en";
  const words = t("home.heroVideo.words", { returnObjects: true }) as string[];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLanguageChange = (lng: "es" | "en") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("appLanguage", lng);
    const canonical = getLocalizedPath(pathname, "en");
    router.replace(getLocalizedPath(canonical, lng));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Language toggle */}
      <div className="absolute top-6 right-6 z-30 hidden sm:flex items-center border border-white/40 rounded-full overflow-hidden text-xs">
        <button
          type="button"
          onClick={() => handleLanguageChange("es")}
          className={`px-3 py-1 transition-colors ${
            currentLanguage === "es"
              ? "bg-white text-black"
              : "bg-transparent text-white"
          }`}
        >
          {t("common.spanish")}
        </button>
        <button
          type="button"
          onClick={() => handleLanguageChange("en")}
          className={`px-3 py-1 transition-colors ${
            currentLanguage === "en"
              ? "bg-white text-black"
              : "bg-transparent text-white"
          }`}
        >
          {t("common.english")}
        </button>
      </div>
      {/* === Video de fondo optimizado para reel === */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <video
          className="h-full w-auto max-w-none"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videohero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* === Overlay con gradiente desde la izquierda === */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* === Contenido alineado a la IZQUIERDA === */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full mx-auto px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            {/* === Logo texto ONE + palabra animada === */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-white leading-none tracking-tight">
                  PALMAS
                </h1>
                <div className="relative mt-2 sm:mt-0 sm:ml-2 w-full h-[3.5rem] sm:w-[400px] sm:h-[10rem]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[currentIndex]}
                      initial={{ y: 100, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 90 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.68, -0.55, 0.265, 1.55],
                      }}
                      className="absolute top-0 left-0 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extralight italic text-white leading-none"
                    >
                      {words[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* === Subtítulo === */}
            <p className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10 font-light max-w-2xl leading-relaxed">
              {t("home.heroVideo.subtitle")}
            </p>

            {/* === Botón CTA mejorado === */}
            <button className="group relative px-6 sm:px-10 py-3 sm:py-4 bg-transparent border-2 rounded-xl border-white text-white text-sm sm:text-lg font-normal tracking-wide overflow-hidden transition-all duration-500 hover:border-white">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                {t("home.heroVideo.cta")}
              </span>
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
