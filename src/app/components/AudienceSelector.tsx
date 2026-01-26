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

export default function AudienceSelector() {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] transition-colors duration-500 ease-out"
      style={{ backgroundColor: active?.color || "#ffffff" }}
    >
      <div className="flex flex-col items-center gap-10">
        {ITEMS.map((item) => {
          const isActive = active?.label === item.label;

          return (
            <span
              key={item.label}
              onMouseEnter={() => setActive(item)}
              onMouseLeave={() => setActive(null)}
              className={`
                text-[42px] md:text-[56px] font-serif cursor-pointer
                transition-all duration-500 ease-out
                ${
                  active
                    ? isActive
                      ? "opacity-100 text-white scale-105"
                      : "opacity-0 pointer-events-none"
                    : "opacity-100 text-black"
                }
              `}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}
