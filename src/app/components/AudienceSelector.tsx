"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

type Item = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  image: string;
  alt: string;
  href: string;
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
    href: "/reservar",
    bg: "bg-wine",
  },
  {
    id: "estancia",
    labelKey: "audience.items.estancia.label",
    descriptionKey: "audience.items.estancia.description",
    image:
      "/Agenda los dias que necesitas despues de tu cirugia plastica el Palmas Recovery.jpg",
    alt: "Agenda tus cuidados en una casa de recuperación con médicos y enfermeras certificadas  ",
    href: "/reservar",
    bg: "bg-blush",
  },
  {
    id: "pago",
    labelKey: "audience.items.pago.label",
    descriptionKey: "audience.items.pago.description",
    image:
      "/Paquetes todo incluidos y cuentas trasparentes al agendar tu estancia en Palmas Recovery.png",
    alt: "Cuentas trasparentes y facilidades de pago al agendar tu estancia en Palmas Recovery ",
    href: "/reservar",
    bg: "bg-olive-dark",
  },
  {
    id: "ubicacion",
    labelKey: "audience.items.ubicacion.label",
    descriptionKey: "audience.items.ubicacion.description",
    image:
      "/Palmas Recovery esta en el corazon de la ciudad cerca de plazas comerciales, hospitales y hoteles.jpg",
    alt: "Palmas Recovery está en las zonas más seguras de la ciudad con plazas comerciales, hospitales y hoteles alrededor ",
    href: "/reservar",
    bg: "bg-sage",
  },
  {
    id: "plazas",
    labelKey: "audience.items.plazas.label",
    descriptionKey: "audience.items.plazas.description",
    image: "/En PR disfruta de comodas amenidades para ti y tu acompanante.jpg",
    alt: "En PR disfruta de comodas amenidades para ti y tu acompanante Gracias a su estrategica ubicacion ",
    href: "/reservar",
    bg: "bg-cream",
  },
];

export default function AudienceSelector() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t } = useTranslation();

  const collapsedHeight = "84px";
  const expandedHeight = "260px";

  const activeItem = ITEMS.find((item) => item.id === activeId);

  return (
    <section
      className={`relative w-full py-14 md:py-20 transition-colors duration-500 ${
        activeItem ? activeItem.bg : "bg-cream"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-wine leading-[1.2]">
            {t("audience.heading.titleLine1")}
            <br />
            {t("audience.heading.titleLine2")}
          </h2>

          <p className="mt-6 text-sm md:text-base text-wine leading-relaxed">
            {t("audience.heading.description")}
          </p>

          <h4 className="mt-4 font-bold text-lg md:text-xl text-wine leading-relaxed">
            {t("audience.heading.description2")}
          </h4>
        </div>
      </div>

      <div className="relative w-full mt-10">
        <ul className="flex flex-col space-y-4 md:space-y-6 py-4 md:py-6">
          {ITEMS.map((item, index) => {
            const isActive = activeId === item.id;

            return (
              <li
                key={item.id}
                className="relative w-full transition-[min-height] duration-300"
                style={{
                  zIndex: isActive ? 50 : 10 - index,
                  minHeight: isActive ? expandedHeight : collapsedHeight,
                }}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="relative w-full flex items-center justify-center cursor-pointer overflow-hidden">
                  {/* Imagen de fondo siempre presente pero oculta cuando no está activa */}
                  <div
                    className={`absolute inset-0 w-full transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      height: expandedHeight,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={t(item.alt)}
                      title={t(item.alt)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-full object-cover"
                      style={{
                        minHeight: expandedHeight,
                      }}
                    />

                    <div className="absolute inset-0 bg-black/50" />
                  </div>

                  <div
                    className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 transition-[height] duration-300"
                    style={{
                      height: isActive ? expandedHeight : collapsedHeight,
                    }}
                  >
                    <h3
                      className={`text-2xl md:text-3xl lg:text-4xl font-serif transition-colors duration-300 ${
                        isActive ? "text-white" : "text-wine"
                      }`}
                      style={{
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        marginBottom: isActive ? "0.75rem" : "0",
                        textShadow: isActive
                          ? "0 2px 4px rgba(0,0,0,0.3)"
                          : "none",
                      }}
                    >
                      {t(item.labelKey)}
                    </h3>

                    {isActive && (
                      <div className="animate-in fade-in duration-300 flex flex-col items-center">
                        <p className="text-white text-base md:text-lg mb-5 leading-relaxed max-w-2xl uppercase tracking-wide text-sm">
                          {t(item.descriptionKey)}
                        </p>

                        <a
                          href={item.href}
                          className="inline-flex items-center gap-2 bg-white text-wine px-6 py-2.5 rounded-full font-medium hover:bg-blush transition-all duration-200 text-sm shadow-lg"
                        >
                          {t("common.viewHotels")}

                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
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
                    )}
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
