"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { ROOMS } from "@/app/components/data/rooms.data";
import { useTranslation } from "react-i18next";
import {
  getRoomIdFromPath,
  getRoomTourPath,
  getTourPath,
} from "@/i18n/slugRoutes";

const TOTAL = ROOMS.length;

type RoomAccent = {
  accentLight: string;
  accentDot: string;
};

function getAccent(roomId: string): RoomAccent {
  switch (roomId) {
    case "lobby":
      return {
        accentLight: "bg-emerald-100 text-emerald-800 border-emerald-200",
        accentDot: "bg-emerald-500",
      };
    case "private":
      return {
        accentLight: "bg-amber-100 text-amber-800 border-amber-200",
        accentDot: "bg-amber-500",
      };
    case "shared":
      return {
        accentLight: "bg-sky-100 text-sky-800 border-sky-200",
        accentDot: "bg-sky-500",
      };
    case "vip":
      return {
        accentLight: "bg-yellow-100 text-yellow-800 border-yellow-200",
        accentDot: "bg-yellow-500",
      };
    default:
      return {
        accentLight: "bg-stone-100 text-stone-800 border-stone-200",
        accentDot: "bg-stone-500",
      };
  }
}

/* ── Magnetic button hook ── */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, sx, sy, onMove, onLeave };
}

/* ── Cursor spotlight ── */
function Spotlight() {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{
        background: `radial-gradient(320px circle at ${mx.get()}px ${my.get()}px, rgba(214,211,208,0.09) 0%, transparent 70%)`,
      }}
    />
  );
}

export default function Page() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const [active, setActive] = useState(0);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const room = ROOMS[active];

  const tour = (() => {
    const index = String(active + 1).padStart(2, "0");
    const nameFlat = t(`rooms.${room.id}.name`);
    const subtitle = t(`rooms.${room.id}.tagDescription`);
    const description = t(`rooms.${room.id}.description`);
    const tag = t(`rooms.${room.id}.tag`);
    const beds = t(`rooms.${room.id}.beds`, { defaultValue: room.beds });
    const size = t(`rooms.${room.id}.size`, { defaultValue: room.size });

    // Ensure amenities is always an array
    let amenities = t(`rooms.${room.id}.amenities`, {
      returnObjects: true,
      defaultValue: room.amenities,
    });
    if (!Array.isArray(amenities)) {
      amenities = room.amenities;
    }

    // Ensure features is always an array
    let features = t(`rooms.${room.id}.features`, {
      returnObjects: true,
      defaultValue: room.features,
    });
    if (!Array.isArray(features)) {
      features = room.features;
    }

    const { accentLight, accentDot } = getAccent(room.id);

    return {
      id: room.id,
      index,
      name: nameFlat,
      nameFlat,
      subtitle,
      description,
      cover: room.image,
      coverAlt: t(`rooms.${room.id}.imageAlt`),
      price: room.price,
      capacity: room.capacity,
      beds,
      size,
      amenities: amenities as string[],
      features: features as string[],
      tag,
      accentLight,
      accentDot,
      href: getTourPath(room.id, currentLang),
    };
  })();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goTo = (next: number) => {
    const newActive = ((next % TOTAL) + TOTAL) % TOTAL;
    setActive(newActive);

    const nextRoom = ROOMS[newActive];
    const pathWithHash = getRoomTourPath(nextRoom.id, currentLang);
    const hash = pathWithHash.includes("#")
      ? `#${pathWithHash.split("#").pop() || ""}`
      : "";
    window.history.replaceState(null, "", hash);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 48 && dy < 60)
      dx > 0 ? goTo(active + 1) : goTo(active - 1);
  };

  const ctaMag = useMagnetic(0.4);

  const handleHashChange = () => {
    const hash = window.location.hash.toLowerCase();
    const raw = hash.replace(/^#/, "");
    if (!raw) return;
    const roomId = getRoomIdFromPath(raw);
    const idx = ROOMS.findIndex((r) => r.id === roomId);
    if (idx >= 0 && idx !== active) setActive(idx);
  };

  useEffect(() => {
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [active]);

  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden selection:bg-stone-900 selection:text-stone-50">
      <Navbar />
      <Spotlight />

      {/* ── PAGE WRAPPER ── */}
      <div
        className="pt-[65px] md:pt-[73px] min-h-screen flex flex-col md:grid md:grid-cols-[1fr_1.1fr]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ══ LEFT / INFO ══ */}
        <div className="order-2 md:order-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 border-r border-stone-200/60">
          {/* Top: tour list / selector */}
          <div className="hidden md:flex flex-row gap-1">
            {ROOMS.map((r, i) => {
              const index = String(i + 1).padStart(2, "0");
              const nameFlat = t(`rooms.${r.id}.name`);
              const { accentDot } = getAccent(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => goTo(i)}
                  className={`group flex items-center gap-4 px-3 py-3 rounded-xl text-left transition-all duration-300 cursor-pointer border-none bg-transparent ${
                    i === active ? "bg-stone-100" : "hover:bg-stone-50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                      i === active
                        ? accentDot
                        : "bg-stone-200 group-hover:bg-stone-300"
                    }`}
                  />
                  <span
                    className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                      i === active
                        ? "text-stone-900 font-medium"
                        : "text-stone-400 group-hover:text-stone-600"
                    }`}
                  >
                    {index} — {nameFlat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center: main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${active}`}
              className="flex flex-col"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Title — big editorial serif */}
              <h1 className=" font-medium text-stone-900 leading-[1] tracking-tight mb-3 text-[clamp(40px,7vw,72px)] whitespace-pre-line">
                {tour.name}
              </h1>

              {/* Subtitle italic */}
              <p className=" italic text-stone-500 text-xl md:text-2xl mb-6 tracking-wide font-normal">
                {tour.subtitle}
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-stone-300 mb-6" />

              {/* Description */}
              <p className="text-base md:text-lg font-light leading-[1.9] text-stone-600 mb-8 max-w-sm">
                {tour.description}
              </p>

              {/* Room details - Using translations */}
              <div className="grid grid-cols-2 gap-3 mb-8 md:mb-10">
                <div className="rounded-2xl border border-stone-200 bg-white/60 px-5 py-4">
                  <div className="text-xs md:text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-1">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.area")
                      : t("common.perNight")}
                  </div>
                  <div className="text-base md:text-lg text-stone-900 font-medium">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.commonSpace")
                      : `$${tour.price}`}
                  </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white/60 px-5 py-4">
                  <div className="text-xs md:text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-1">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.access")
                      : t("roomDetail.capacity")}
                  </div>
                  <div className="text-base md:text-lg text-stone-900 font-medium">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.allGuests")
                      : t("searchBar.accommodates", {
                          count: tour.capacity || 0,
                        })}
                  </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white/60 px-5 py-4">
                  <div className="text-xs md:text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-1">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.service")
                      : t("roomDetail.bedType")}
                  </div>
                  <div className="text-base md:text-lg text-stone-900 font-medium">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.reception247")
                      : tour.beds}
                  </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white/60 px-5 py-4">
                  <div className="text-xs md:text-[10px] tracking-[0.22em] uppercase text-stone-400 mb-1">
                    {tour.id === "lobby"
                      ? t("rooms.lobby.labels.area")
                      : t("roomDetail.roomSize")}
                  </div>
                  <div className="text-base md:text-lg text-stone-900 font-medium">
                    {tour.size}
                  </div>
                </div>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-3 mb-8 md:mb-10">
                {Array.isArray(tour.features) &&
                  tour.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <svg
                        className="w-4 h-4 text-stone-400 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-stone-600 font-normal">
                        {f}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Amenities */}
              <div className="mb-8 md:mb-10">
                <div className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-3">
                  {tour.id === "lobby"
                    ? t("rooms.lobby.labels.services")
                    : t("roomsPage.amenitiesTitle")}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.isArray(tour.amenities) &&
                    tour.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-stone-300" />
                        <span className="text-sm text-stone-600 font-normal">
                          {a}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* CTA - Show for all rooms including lobby */}
              <motion.a
                ref={ctaMag.ref as React.RefObject<HTMLAnchorElement>}
                href={tour.href}
                onMouseMove={ctaMag.onMove}
                onMouseLeave={ctaMag.onLeave}
                style={{ x: ctaMag.sx, y: ctaMag.sy }}
                className="group relative inline-flex items-center gap-3 text-sm md:text-base font-medium tracking-[0.15em] uppercase text-stone-50 bg-stone-900 px-8 py-4 rounded-full overflow-hidden self-start no-underline w-full md:w-auto justify-center md:justify-start hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* shimmer */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                />
                <svg
                  className="w-4 h-4 opacity-70"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
                {tour.id === "lobby"
                  ? t("tour360.viewLobby")
                  : t("tour360.startTour")}
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </AnimatePresence>

          {/* Bottom: prev/next desktop */}
          <div className="hidden md:flex items-center justify-between pt-6 border-t border-stone-100">
            <button
              onClick={() => goTo(active - 1)}
              className="group flex items-center gap-2 text-sm text-stone-400 hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t(`rooms.${ROOMS[(active - 1 + TOTAL) % TOTAL].id}.name`)}
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="group flex items-center gap-2 text-sm text-stone-400 hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {t(`rooms.${ROOMS[(active + 1) % TOTAL].id}.name`)}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ══ RIGHT / IMAGE ══ */}
        <div className="order-1 md:order-2 relative h-[62vw] min-h-[260px] max-h-[450px] md:h-auto md:max-h-none overflow-hidden bg-stone-200">
          {/* Image with parallax */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${active}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={tour.cover}
                alt={tour.coverAlt}
                className="w-full h-full object-cover"
              />

              {/* Dark vignette bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
              {/* Left fade into info panel (desktop only) */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none hidden md:block" />
            </motion.div>
          </AnimatePresence>

          {/* 360° floating badge - Show for all including lobby */}
          <motion.div
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white/90 backdrop-blur-md border border-white/60 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.svg
              className="w-4 h-4 md:w-3.5 md:h-3.5 text-stone-700 fill-current"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </motion.svg>
            <span className="text-xs md:text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-700">
              {tour.id === "lobby"
                ? t("tour360.viewLobby")
                : t("tour360.badge")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          {/* Bottom overlay info (mobile: show tour name on image) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-title-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <span
                  className={`inline-block text-[9px] font-medium tracking-[0.25em] uppercase border px-2.5 py-1 rounded-full mb-2 ${tour.accentLight}`}
                >
                  {tour.tag}
                </span>
                <h2 className=" text-2xl font-medium text-white leading-tight drop-shadow-lg">
                  {tour.nameFlat}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop: thumbnail strip inside image */}
          <div className="absolute bottom-6 right-6 z-10 hidden md:flex flex-col gap-2">
            {ROOMS.map((r, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                onHoverStart={() => setHoveredThumb(i)}
                onHoverEnd={() => setHoveredThumb(null)}
                className={`relative overflow-hidden rounded-lg cursor-pointer border-none p-0 transition-all duration-300 ${
                  i === active
                    ? "w-16 h-12 ring-2 ring-white shadow-xl"
                    : "w-12 h-9 opacity-60 hover:opacity-90"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={r.image}
                  alt={t(`rooms.${r.id}.imageAlt`)}
                  className="w-full h-full object-cover"
                />
                {hoveredThumb === i && i !== active && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress bar (desktop) */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 hidden md:block">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${((active + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="md:hidden flex flex-col items-center gap-4 px-6 pt-4 pb-8">
        {/* Tour selector tabs */}
        <div className="flex gap-2 w-full">
          {ROOMS.map((r, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-[10px] font-medium tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer border-none ${
                i === active
                  ? "bg-stone-900 text-stone-50"
                  : "bg-stone-100 text-stone-400 hover:bg-stone-200"
              }`}
            >
              {t(`rooms.${r.id}.name`)}
            </button>
          ))}
        </div>

        {/* Swipe hint - Show for all */}
        <p className="text-xs tracking-[0.2em] uppercase text-stone-400">
          {t("tour360.swipeHint")}
        </p>
      </div>
    </main>
  );
}
