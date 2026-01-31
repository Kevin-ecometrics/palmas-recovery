"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80",
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
    <section className="bg-[#cdc6e3] py-32">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">
        {/* LEFT – STATIC TEXT */}
        <div>
          <h2 className="text-4xl font-serif mb-6">{t("uniqueHotels.title")}</h2>

          <p className="text-sm max-w-md mb-10">
            {t("uniqueHotels.description")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
            {bullets.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        {/* RIGHT – FRAMER CAROUSEL */}
        <div className="relative w-full h-[420px] overflow-hidden">
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

          {/* CONTROLS */}
          <div className="absolute bottom-6 right-6 flex gap-4 z-10">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white transition flex items-center justify-center text-xl"
              aria-label={t("uniqueHotels.prev")}
            >
              ‹
            </button>

            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white transition flex items-center justify-center text-xl"
              aria-label={t("uniqueHotels.next")}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
