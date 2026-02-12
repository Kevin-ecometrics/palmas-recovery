"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const BannerWithImage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center px-6 py-12 md:px-12 md:py-24">
      {/* Texto a la izquierda */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Título */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("bannerWithImage.title")}
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("bannerWithImage.subtitle")}
        </motion.p>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/reservar/"
            className="bg-transparent border-2 border-black text-black py-3 px-8 rounded-full text-lg hover:bg-black hover:text-white transition-all duration-300 inline-block text-center"
          >
            {t("bannerWithImage.button")}
          </Link>
        </motion.div>
      </div>

      {/* Mapa a la derecha */}
      <div className="w-full md:w-1/2">
        <motion.div
          className="w-full aspect-[4/3] rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/doctores.jpg"
            alt={t("bannerWithImage.imageAlt")}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BannerWithImage;
