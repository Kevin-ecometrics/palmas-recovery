"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

type Item = {
  id: string;
  labelKey: string;
  descriptionKey: string;
  image: string;
  color: string;
  bgColor: string;
  href: string;
};

const ITEMS: Item[] = [
  {
    id: "parejas",
    labelKey: "audience.items.parejas.label",
    descriptionKey: "audience.items.parejas.description",
    image: "/img1.jpg",
    color: "#0E5A3A",
    bgColor: "#0E5A3A",
    href: "/es/tipo-de-viaje/parejas/",
  },
  {
    id: "negocios",
    labelKey: "audience.items.negocios.label",
    descriptionKey: "audience.items.negocios.description",
    image: "/img7.jpg",
    color: "#4CAF73",
    bgColor: "#4CAF73",
    href: "/es/tipo-de-viaje/negocios/",
  },
  {
    id: "urbano",
    labelKey: "audience.items.urbano.label",
    descriptionKey: "audience.items.urbano.description",
    image: "/img6.jpg",
    color: "#1F6F8B",
    bgColor: "#1F6F8B",
    href: "/es/tipo-de-viaje/viajar-solo/",
  },
  {
    id: "familia",
    labelKey: "audience.items.familia.label",
    descriptionKey: "audience.items.familia.description",
    image: "/img4.jpg",
    color: "#7DB9A2",
    bgColor: "#7DB9A2",
    href: "/es/tipo-de-viaje/familia-y-amigos/",
  },
  {
    id: "luxury",
    labelKey: "audience.items.luxury.label",
    descriptionKey: "audience.items.luxury.description",
    image: "/img8.jpg",
    color: "#7DB9A2",
    bgColor: "#7DB9A2",
    href: "/es/tipo-de-viaje/familia-y-amigos/",
  },
];

export default function AudienceSelector() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t } = useTranslation();

  const collapsedHeight = "84px";
  const expandedHeight = "260px";
  const expandedHeightMd = "280px";

  const activeItem = ITEMS.find((item) => item.id === activeId);

  return (
    <section
      className="relative w-full py-14 md:py-20 transition-colors duration-300"
      style={{
        backgroundColor: activeItem ? activeItem.bgColor : "#ffffff",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="max-w-md">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] leading-[1.2]">
            {t("audience.heading.titleLine1")}
            <br />
            {t("audience.heading.titleLine2")}
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#1a1a1a] leading-relaxed">
            {t("audience.heading.description")}
          </p>
        </div>
      </div>

      <div className="relative w-full mt-10">
        <ul className="flex flex-col space-y-4 md:space-y-6 py-4 md:py-6">
          {ITEMS.map((item, index) => {
            const isActive = activeId === item.id;
            
            // Ajustes específicos para las últimas 2 imágenes en desktop
            const isLastTwoItems = index >= 3; // Índices 3 y 4
            const desktopAdjustment = isLastTwoItems ? "md:top-[-10%]" : "";

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
                <div className="relative w-full flex items-center justify-center cursor-pointer">
                  {isActive && (
                    <div
                      className="absolute inset-0 left-0 right-0 w-full overflow-hidden transition-opacity duration-300"
                      style={{
                        opacity: isActive ? 1 : 0,
                        height: expandedHeight,
                        top: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={t(item.labelKey)}
                        className={`absolute left-0 w-full h-auto object-cover ${desktopAdjustment}`}
                        style={{
                          // Para móvil: todas las imágenes igual
                          // Para desktop: últimas 2 imágenes más arriba
                          height: "115%",
                          minHeight: expandedHeight,
                          top: "0",
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 transition-[height] duration-300"
                    style={{
                      height: isActive ? expandedHeight : collapsedHeight,
                    }}
                  >
                    <h3
                      className="text-2xl md:text-3xl lg:text-4xl font-serif transition-colors duration-300"
                      style={{
                        color: isActive ? "#ffffff" : "#1a1a1a",
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        marginBottom: isActive ? "0.75rem" : "0",
                        textShadow: isActive ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
                      }}
                    >
                      {t(item.labelKey)}
                    </h3>

                    {isActive && (
                      <div className="animate-in fade-in duration-300 flex flex-col items-center">
                        <p
                          className="text-white text-base md:text-lg mb-5 leading-relaxed max-w-2xl uppercase tracking-wide"
                          style={{ 
                            fontSize: "0.85rem",
                            textShadow: "0 1px 2px rgba(0,0,0,0.5)"
                          }}
                        >
                          {t(item.descriptionKey)}
                        </p>

                        <a
                          href={item.href}
                          className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-opacity-90 transition-all duration-200 text-sm"
                          style={{
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                          }}
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

      <style jsx>{`
        @media (min-width: 768px) {
          div[style*="height: 260px"] {
            height: ${expandedHeightMd};
          }
          li[style*="min-height: 260px"] {
            min-height: ${expandedHeightMd};
          }
          
          /* Para las últimas 2 imágenes en desktop */
          li:nth-child(4) img,
          li:nth-child(5) img {
            top: -15% !important;
            height: 130% !important;
          }
          
          /* Para las primeras 3 imágenes - mantener como estaban */
          li:nth-child(1) img,
          li:nth-child(2) img,
          li:nth-child(3) img {
            top: 0 !important;
            height: 115% !important;
          }
        }
        
        /* Ajustes para pantallas más grandes */
        @media (min-width: 1024px) {
          li:nth-child(4) img,
          li:nth-child(5) img {
            top: -20% !important;
            height: 140% !important;
          }
        }
      `}</style>
    </section>
  );
}