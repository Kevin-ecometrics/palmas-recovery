"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BannerWithImage: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen lg:min-h-[90vh] flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto py-12 px-6 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-8 lg:pr-8">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {t("bannerWithImage.title")}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("bannerWithImage.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-start"
            >
              <Link
                href={pathname === "/en/" ? "/rooms" : "/habitaciones"}
                aria-label={t("bannerWithImage.button")}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-black rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1 active:translate-y-0"
              >
                <span className="relative z-10">
                  {t("bannerWithImage.button")}
                </span>
                <svg
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden">
                    <img
                      src="/Palmas Recovery creada por medicos y atendida por medicos.webp"
                      alt="Palmas Recovery es una casa de recuperación creado por médicos y atendida por médicos con años de experiencia en cuidados "
                      title="Palmas Recovery es una casa de recuperación creado por médicos y atendida por médicos con años de experiencia en cuidados "
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={550}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-blue-500/5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerWithImage;
