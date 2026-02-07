"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const IMAGES = [
  "/doctor1.jpg",
  "/doctor2.jpg",
  "/doctor3.jpg",
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
  }),
};

export default function UniqueHotels() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const { t } = useTranslation();
  const bullets = t("uniqueHotels.bullets", { returnObjects: true }) as string[];

  const paginate = (newDirection: number) => {
    setIndex(([prev]) => {
      const newIndex =
        newDirection === 1
          ? (prev + 1) % IMAGES.length
          : (prev - 1 + IMAGES.length) % IMAGES.length;

      return [newIndex, newDirection];
    });
  };

  return (
    <section className="bg-[#cdc6e3] py-16 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-center px-4 md:px-6">
        {/* LEFT – STATIC TEXT */}
        <div className="max-w-none md:-ml-8 lg:-ml-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            {t("uniqueHotels.title")}
          </h2>

          <p className="text-base md:text-lg max-w-none mb-8 md:mb-10">
            {t("uniqueHotels.description")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 md:gap-x-10 text-base md:text-lg">
            {bullets.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        {/* RIGHT – FRAMER CAROUSEL - CONTENIDO DENTRO DEL CONTENEDOR */}
        <div className="relative w-full max-w-xl mx-auto">
          {/* CONTENEDOR PRINCIPAL CON ALTURA FIJA */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden rounded-xl">
            
            {/* IMAGEN PRINCIPAL */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                src={IMAGES[index]}
                alt="Hotel"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* OVERLAY PARA MEJOR VISIBILIDAD DE BOTONES */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            {/* BOTONES DE NAVEGACIÓN - DENTRO DE LA IMAGEN */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center text-xl shadow-lg"
                aria-label={t("uniqueHotels.prev")}
              >
                ‹
              </button>

              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white transition flex items-center justify-center text-xl shadow-lg"
                aria-label={t("uniqueHotels.next")}
              >
                ›
              </button>
            </div>

            {/* INDICADORES - DENTRO DE LA IMAGEN */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white w-6' : 'bg-white/60 hover:bg-white'}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}