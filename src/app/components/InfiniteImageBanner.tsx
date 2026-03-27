"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const IMAGES_TOP = [
  "/mommy makeover/mommy 1.jpg",
  "/mommy makeover/MOMMY 2.jpg",
  "/mommy makeover/MOMMY 3.jpg",
  "/mommy makeover/MOMMY 4.jpg",
  "/mommy makeover/MOMMY 5.jpg",
  "/mommy makeover/MOMMY FINAL.jpg",
];

const IMAGES_BOTTOM = [
  "/POST PALMAS RECOVERY SERVICES/PALMAS POST 1.jpg",
  "/POST PALMAS RECOVERY SERVICES/POST 2.jpg",
  "/process for a BBL/BBL 1.1.jpg",
  "/process for a BBL/BBL 1.2.jpg",
  "/process for a BBL/BBL 6.1.jpg",
  "/process for a BBL/BBL 7.1.jpg",
  "/process for a BBL/BBL3.1.jpg",
  "/process for a BBL/BBL4.1.jpg",
  "/process for a BBL/BBL5.1.jpg",
];

const FALLBACK_IMAGE = "/logo.png";

function MarqueeRow({
  images,
  direction = "left",
  speed = 40,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const xStart = direction === "left" ? "0%" : "-50%";
  const xEnd = direction === "left" ? "-50%" : "0%";

  return (
    <div className="overflow-hidden w-full relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#faf9f7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#faf9f7] to-transparent" />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: [xStart, xEnd] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-[260px] h-[270px] flex-shrink-0 overflow-hidden group"
            style={{ borderRadius: "2px" }}
          >
            <img
              src={src}
              alt="Gallery"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
              onError={(event) => {
                const target = event.currentTarget;
                if (target.src !== window.location.origin + FALLBACK_IMAGE) {
                  target.src = FALLBACK_IMAGE;
                }
              }}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteImageBanner() {
  const { t } = useTranslation();

  return (
    <section className="py-28 bg-[#faf9f7] overflow-hidden">
      <div className="flex flex-col gap-0">
        {/* TOP ROW */}
        <MarqueeRow images={IMAGES_TOP} direction="left" speed={40} />

        {/* CENTER CONTENT */}
        <div className="relative py-20 px-6 text-center">
          {/* Decorative thin line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-stone-300" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-6 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Gallery
            </p>

            <h2
              className="text-[2.6rem] leading-[1.1] text-stone-800 mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
              }}
            >
              {t("infiniteBanner.title1")}
            </h2>

            <p
              className="text-[2.6rem] leading-[1.1] text-stone-500 mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              {t("infiniteBanner.title2")}
            </p>

            <a
              href="https://www.instagram.com/palmasrecovery/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("infiniteBanner.ctaAria")}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase font-medium text-stone-800 border border-stone-300 hover:border-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "1px",
              }}
            >
              <FaInstagram size={13} />
              @palmasrecovery
            </a>
          </motion.div>

          {/* Decorative thin line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-stone-300" />
        </div>

        {/* BOTTOM ROW — reversed direction */}
        <MarqueeRow images={IMAGES_BOTTOM} direction="right" speed={50} />
      </div>
    </section>
  );
}
