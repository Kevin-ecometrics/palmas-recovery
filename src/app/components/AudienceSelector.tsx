"use client";

import { useState } from "react";

type Item = {
  label: string;
  color: string;
};

const ITEMS: Item[] = [
  { label: "Couples", color: "#0E5A3A" },
  { label: "Business + Leisure", color: "#4CAF73" },
  { label: "Urban explorer", color: "#1F6F8B" },
  { label: "Family & Friends", color: "#7DB9A2" },
];

const DESCRIPTION =
  "ECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICAECOMMETRICA";

const getImageSrc = (label: string) =>
  `/${label.toLowerCase().replace(/\s+/g, "-")}-img.jpg`;

export default function AudienceSelector() {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <section
      className="relative flex items-center justify-start min-h-[60vh] transition-colors duration-500 ease-out px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: active?.color || "#ffffff" }}
      onMouseLeave={() => {
        setActive(null);
      }}
    >
      <div className="flex flex-col items-start gap-10">
        {ITEMS.map((item) => {
          const isActive = active?.label === item.label;

          return (
            <span
              key={item.label}
              onMouseEnter={() => {
                setActive(item);
              }}
              className={`
                text-[42px] md:text-[56px] font-serif cursor-pointer text-left
                transition-all duration-500 ease-out
                ${
                  active
                    ? isActive
                      ? "opacity-100 text-white scale-105"
                      : "opacity-40 text-white"
                    : "opacity-100 text-black"
                }
              `}
            >
              {item.label}
            </span>
          );
        })}
      </div>

      {active && (
        <div className="mt-2 flex flex-col items-center gap-4 px-6">
          <img
            src={getImageSrc(active.label)}
            alt={active.label}
            className="w-[320px] md:w-[420px] h-[200px] md:h-[260px] object-cover rounded-2xl shadow-xl"
          />
          <p className="text-white/90 text-center text-base md:text-lg max-w-2xl">
            {DESCRIPTION}
          </p>
        </div>
      )}
    </section>
  );
}
