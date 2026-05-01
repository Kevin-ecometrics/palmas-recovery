"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUsers, FaBed } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ROOMS } from "../components/data/rooms.data";
import { useTranslation } from "react-i18next";
import { getTourPath, getRoomTourPath } from "@/i18n/slugRoutes";
import { getLocalizedPath } from "@/i18n/routeMap";

/* ─────────────────────────────────────────────────────────────
   Hook: detectar cuando un elemento entra al viewport
───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────────────
   Tarjeta de habitación con su propio inView
───────────────────────────────────────────────────────────── */
function RoomCard({
  room,
  index,
  t,
  currentLang,
}: {
  room: (typeof ROOMS)[number];
  index: number;
  t: ReturnType<typeof useTranslation>["t"];
  currentLang: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;

  const name = t(`rooms.${room.id}.name`);
  const subtitle = t(`rooms.${room.id}.subtitle`);
  const tagline = t(`rooms.${room.id}.tagline`);
  const description = t(`rooms.${room.id}.description`);
  const beds = t(`rooms.${room.id}.beds`);
  const size = t(`rooms.${room.id}.size`);
  const amenities = t(`rooms.${room.id}.amenities`, {
    returnObjects: true,
  }) as string[];
  const highlight = t(`rooms.${room.id}.highlight`);

  return (
    <div
      ref={ref}
      className="mb-28 last:mb-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`group relative overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-shadow duration-500 flex flex-col bg-white ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } lg:flex`}
      >
        {/* ── Imagen ─────────────────────────────────── */}
        <div className="lg:w-[58%] relative overflow-hidden min-h-[480px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent z-10" />
          <img
            src={room.image}
            alt={t(`rooms.${room.id}.imageAlt`)}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1.0)",
              transition: "transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />

          {/* Badge highlight */}
          <div className="absolute top-7 left-7 z-20">
            <span className="bg-principal text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg">
              {highlight}
            </span>
          </div>

          {/* Número de card */}
          <div className="absolute top-7 right-7 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="text-white text-sm font-bold font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Precio flotante */}
          {room.price && (
            <div className="absolute bottom-7 right-7 z-20 bg-white/96 backdrop-blur-sm p-5 rounded-2xl shadow-2xl">
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase mb-1">
                {t("common.from") || "Desde"}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 leading-none">
                  ${room.price}
                </span>
                <span className="text-gray-400 text-xs ml-1">
                  {t("common.perNight")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Contenido ──────────────────────────────── */}
        <div className="lg:w-[42%] p-10 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
          {/* Eyebrow */}
          <p className="text-principal font-bold tracking-[0.32em] text-[10px] mb-3 uppercase">
            {subtitle}
          </p>

          {/* Nombre */}
          <h2 className="text-4xl lg:text-[2.75rem] font-serif font-bold text-gray-900 mb-2 leading-tight">
            {name}
          </h2>

          {/* Tagline */}
          <p className="text-base text-gray-400 font-light italic mb-5 leading-snug">
            {tagline}
          </p>

          {/* Separador decorativo */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-principal" />
            <div className="w-1.5 h-1.5 bg-principal rounded-full" />
          </div>

          {/* Descripción */}
          <p className="text-gray-500 leading-relaxed mb-7 text-sm">
            {description}
          </p>

          {/* Detalles */}
          <div className="space-y-3 mb-7 pb-7 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <FaBed className="text-principal text-sm mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm leading-relaxed">
                {beds}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MdZoomOutMap className="text-principal text-base mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm leading-relaxed">
                {size}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FaUsers className="text-principal text-sm mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm leading-relaxed">
                {t("searchBar.accommodates", { count: room.capacity || 0 })}
              </span>
            </div>
          </div>

          {/* Amenidades */}
          <div className="mb-8">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
              <div className="w-5 h-px bg-principal" />
              {t("roomsPage.amenitiesTitle")}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-500 text-sm"
                >
                  <div className="w-1 h-1 bg-principal rotate-45 flex-shrink-0" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Link
              href={getRoomTourPath(room.id, currentLang as "es" | "en")}
              className="group/btn relative w-full bg-gray-900 text-white font-bold py-4 overflow-hidden transition-all duration-300 hover:shadow-xl rounded-full text-center"
            >
              <span className="relative z-10 tracking-[0.18em] text-xs uppercase">
                {t("roomsPage.viewDetails")}
              </span>
              <div className="absolute inset-0 bg-principal transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 rounded-full" />
            </Link>
            <Link
              href={getTourPath(room.id, currentLang as "es" | "en")}
              className="group/btn relative w-full bg-transparent border border-gray-200 text-gray-700 font-bold py-4 overflow-hidden transition-all duration-300 hover:shadow-md rounded-full text-center"
            >
              <span className="relative z-10 tracking-[0.18em] text-xs uppercase group-hover/btn:text-white transition-colors duration-300">
                {t("roomsPage.viewAllTours")}
              </span>
              <div className="absolute inset-0 bg-wine transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 rounded-full" />
            </Link>
          </div>

          <p className="text-center text-[11px] text-gray-300 mt-4">
            {t("roomsPage.limited")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Página principal
───────────────────────────────────────────────────────────── */
export default function RoomsPage() {
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const heroRoom = ROOMS[0];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO — Banner estático elegante
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        {/* Fondo con Ken Burns sutil */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${heroRoom.image}")`,
            animation: "kenBurns 20s ease-in-out infinite alternate",
          }}
        />

        {/* Capas de overlay */}
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

        {/* Línea vertical decorativa — izquierda */}
        <div
          className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 1s ease 0.9s, transform 1s ease 0.9s",
          }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-white/30" />
          <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase font-light rotate-90 whitespace-nowrap">
            Luxury Rooms
          </span>
          <div className="w-px h-20 bg-gradient-to-t from-transparent to-white/30" />
        </div>

        {/* ── Contenido hero ─────────────────────────── */}
        <div className="relative z-20 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-20">
            <div className="max-w-3xl">
              {/* Eyebrow animado */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(14px)",
                  transition:
                    "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
              >
                <span className="inline-flex items-center gap-3 text-white text-[11px] font-bold tracking-[0.35em] uppercase mb-7">
                  <span className="w-8 h-px bg-principal" />
                  {t("roomsPage.ourSpaces")}
                </span>
              </div>

              {/* Título — serif grande y dramático */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(28px)",
                  transition:
                    "opacity 0.85s ease 0.25s, transform 0.85s ease 0.25s",
                }}
              >
                <h1 className="font-serif font-bold text-white leading-[0.9] mb-7">
                  <span className="block text-6xl md:text-7xl lg:text-[6.5rem]">
                    {t("roomsPage.heroTitle") || "Nuestras"}
                  </span>
                </h1>
              </div>

              {/* Descripción */}
              <div
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s",
                }}
              >
                <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                  {t("roomsPage.heroDescription") ||
                    "Espacios diseñados para ofrecerte una experiencia única. Confort, elegancia y los mejores acabados en cada detalle."}
                </p>
              </div>

              {/* Botones CTA */}
              <div
                className="flex flex-col sm:flex-row items-start gap-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.62s, transform 0.8s ease 0.62s",
                }}
              >
                {/* Primario — Contáctanos */}
                <Link
                  href={getLocalizedPath(
                    "/contact",
                    currentLang as "es" | "en",
                  )}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-principal text-white font-bold text-sm tracking-[0.18em] uppercase overflow-hidden rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
                >
                  <span className="relative z-10">
                    {t("common.contactUs") || "Contáctanos"}
                  </span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-white/15 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>

                {/* Secundario — Ver habitaciones (scroll suave) */}
                <a
                  href="#rooms"
                  className="group inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-bold text-sm tracking-[0.18em] uppercase rounded-full transition-all duration-300 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm"
                >
                  {t("roomsPage.exploreRooms") || "Ver Habitaciones"}
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1s ease 1.3s",
          }}
        >
          <div className="w-6 h-10 border border-white/25 rounded-full flex justify-center pt-2">
            <div
              className="w-0.5 h-2.5 bg-white/60 rounded-full"
              style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes kenBurns {
            from { transform: scale(1.0) translate(0px, 0px); }
            to   { transform: scale(1.06) translate(-10px, -6px); }
          }
          @keyframes scrollDot {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50%       { opacity: 1;   transform: translateY(6px); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          ROOMS SECTION
      ══════════════════════════════════════════════════════ */}
      <div id="rooms" className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-24">
            <p className="text-principal font-bold tracking-[0.35em] text-[11px] mb-4 uppercase">
              {t("roomsPage.ourSpaces")}
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-5 leading-tight">
              {t("roomsPage.discoverTitle")}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gray-200" />
              <div className="w-2 h-2 bg-principal rotate-45" />
              <div className="w-12 h-px bg-gray-200" />
            </div>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t("roomsPage.discoverDescription")}
            </p>
          </div>

          {/* Room Cards */}
          {ROOMS.slice(1, 5).map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              t={t}
              currentLang={currentLang}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
