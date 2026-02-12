"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
  const { t, i18n } = useTranslation();
  // Rotating titles for both languages
  const titles = i18n.language === "es"
    ? [
        t("bannerAbout.title1"),
        t("bannerAbout.title2"),
        t("bannerAbout.title3")
      ]
    : [
        t("bannerAbout.title1"),
        t("bannerAbout.title2"),
        t("bannerAbout.title3")
      ];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center overflow-hidden"
      style={{ backgroundColor: '#222' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Imagen de fondo real */}
      <img
        src="/lobby.jpg"
        alt="Banner background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        draggable={false}
      />
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Contenido centrado */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20 px-4 sm:px-8 md:px-16 w-full flex flex-col items-center">
        {/* Título rotativo */}
        <motion.h2
          key={currentTitle}
          className="text-3xl md:text-5xl font-bold mb-4 min-h-[60px]"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {titles[currentTitle]}
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl mb-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Puedes agregar un subtítulo si lo deseas */}
        </motion.p>

        {/* Botón centrado */}
        <motion.button
          className="mx-auto bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          {t("bannerAbout.button")}
          <FaArrowRight className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Banner;
