"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getRouteByKey } from "@/i18n/routeMap";
import type { Lang } from "@/i18n/routeMap";
type Item = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  image: string;
  alt: string;
  bg: string;
};

const ITEMS: Item[] = [
  {
    id: "linea",
    labelKey: "audience.items.linea.label",
    descriptionKey: "audience.items.linea.description",
    image:
      "/Palmas recovery a solo 10 minutos de la linea, en la zona más centrica de la ciudad.webp",
    alt: "Palmas Recovery se enucentra en la zona más segura y de fácil acceso y cruce a la linea fronteriza ",
    bg: "bg-wine",
  },
  {
    id: "estancia",
    labelKey: "audience.items.estancia.label",
    descriptionKey: "audience.items.estancia.description",
    image:
      "/Agenda los dias que necesitas despues de tu cirugia plastica el Palmas Recovery.jpg",
    alt: "Agenda tus cuidados en una casa de recuperación con médicos y enfermeras certificadas  ",
    bg: "bg-blush",
  },
  {
    id: "pago",
    labelKey: "audience.items.pago.label",
    descriptionKey: "audience.items.pago.description",
    image:
      "/Paquetes todo incluidos y cuentas trasparentes al agendar tu estancia en Palmas Recovery.png",
    alt: "Cuentas trasparentes y facilidades de pago al agendar tu estancia en Palmas Recovery ",
    bg: "bg-olive-dark",
  },
  {
    id: "ubicacion",
    labelKey: "audience.items.ubicacion.label",
    descriptionKey: "audience.items.ubicacion.description",
    image:
      "/Palmas Recovery esta en el corazon de la ciudad cerca de plazas comerciales, hospitales y hoteles.jpg",
    alt: "Palmas Recovery está en las zonas más seguras de la ciudad con plazas comerciales, hospitales y hoteles alrededor ",
    bg: "bg-sage",
  },
  {
    id: "plazas",
    labelKey: "audience.items.plazas.label",
    descriptionKey: "audience.items.plazas.description",
    image: "/En PR disfruta de comodas amenidades para ti y tu acompanante.jpg",
    alt: "En PR disfruta de comodas amenidades para ti y tu acompanante Gracias a su estrategica ubicacion ",
    bg: "bg-cream",
  },
];

export default function AudienceSelector() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const COLLAPSED_HEIGHT = 84;
  const EXPANDED_HEIGHT = 280;

  const activeItem = ITEMS.find((item) => item.id === activeId);
  const hasActiveItem = activeId !== null;

  return (
    <section
      className={`relative w-full py-14 md:py-20 transition-colors duration-700 ease-in-out ${
        activeItem ? activeItem.bg : "bg-cream"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
        <div>
          <h2
            className={`text-4xl md:text-5xl font-serif leading-[1.2] transition-colors duration-500 ease-in-out ${
              hasActiveItem ? "text-white" : "text-wine"
            }`}
            style={{
              textShadow: hasActiveItem ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
            }}
          >
            {t("audience.heading.titleLine1")}
            <br />
            {t("audience.heading.titleLine2")}
          </h2>

          <p
            className={`mt-6 text-sm md:text-base leading-relaxed transition-colors duration-500 ease-in-out ${
              hasActiveItem ? "text-white/90" : "text-wine"
            }`}
            style={{
              textShadow: hasActiveItem ? "0 1px 4px rgba(0,0,0,0.25)" : "none",
            }}
          >
            {t("audience.heading.description")}
          </p>

          <h4
            className={`mt-4 font-bold text-lg md:text-xl leading-relaxed transition-colors duration-500 ease-in-out ${
              hasActiveItem ? "text-white" : "text-wine"
            }`}
            style={{
              textShadow: hasActiveItem ? "0 1px 4px rgba(0,0,0,0.25)" : "none",
            }}
          >
            {t("audience.heading.description2")}
          </h4>
        </div>
      </div>

      <div className="relative w-full mt-10">
        <ul className="flex flex-col gap-4 md:gap-6 py-4 md:py-6">
          {ITEMS.map((item, index) => {
            const isActive = activeId === item.id;
            const isInactive = hasActiveItem && !isActive;

            return (
              <li
                key={item.id}
                className="relative w-full transition-all duration-500 ease-out will-change-[height]"
                style={{
                  zIndex: isActive ? 50 : 10 - index,
                  height: isActive
                    ? `${EXPANDED_HEIGHT}px`
                    : `${COLLAPSED_HEIGHT}px`,
                }}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden rounded-lg">
                  {/* Background Image */}
                  <div
                    className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={t(item.alt)}
                      title={t(item.alt)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 py-4">
                    {/* Title */}
                    <h3
                      className={`text-2xl md:text-3xl lg:text-4xl font-serif transition-all duration-300 ease-out ${
                        isActive
                          ? "text-white transform scale-105"
                          : isInactive
                            ? "text-white/90"
                            : "text-wine"
                      }`}
                      style={{
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        textShadow:
                          isActive || isInactive
                            ? "0 2px 8px rgba(0,0,0,0.4)"
                            : "none",
                      }}
                    >
                      {t(item.labelKey)}
                    </h3>

                    {/* Expanded Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isActive
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-5">
                        <p className="text-white text-sm md:text-base leading-relaxed max-w-2xl uppercase tracking-wide drop-shadow-lg">
                          {t(item.descriptionKey)}
                        </p>
                        <a
                          href={getRouteByKey("book", lang)}
                          className="inline-flex items-center gap-2 bg-white text-wine px-6 py-3 rounded-full font-medium hover:bg-blush hover:scale-105 transition-all duration-300 text-sm shadow-xl hover:shadow-2xl"
                        >
                          {t("common.viewHotels")}
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            <path
                              d="M6.12476 14.1248L14.3743 5.87518"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.12476 5.87524H14.3743V14.1248"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
