"use client";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const { t } = useTranslation();
  const items = t("banner.items", { returnObjects: true }) as string[];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isPaused = false;
    const speed = 1.2;

    positionRef.current = 0;
    container.style.transform = "translateX(0px)";

    const animate = () => {
      if (!isPaused && container) {
        positionRef.current -= speed;

        if (Math.abs(positionRef.current) >= container.scrollWidth / 2) {
          positionRef.current = 0;
        }

        container.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [items.join("|")]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 py-5 select-none border-y border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
        {/* Parte FIJA a la izquierda */}
        <div className="w-full sm:w-[15%] flex-shrink-0 px-4 sm:px-8 z-10 relative">
          <div className="inline-flex items-center gap-3 text-black px-3 sm:px-5 py-2.5 rounded">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase whitespace-nowrap">
              {t("banner.exclusive")}
            </span>
          </div>
        </div>

        {/* Contenedor del scroll con degradado en los bordes */}
        <div className="w-full sm:w-[85%] overflow-hidden relative">
          {/* Degradado izquierdo */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-white to-transparent z-10 pointer-events-none"></div>

          {/* Degradado derecho */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-white to-transparent z-10 pointer-events-none"></div>

          <div
            ref={containerRef}
            className="flex whitespace-nowrap will-change-transform items-center"
          >
            {[...items, ...items].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center mx-6 group">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {item}
                  </span>
                </div>
                {index < items.length * 2 - 1 && (
                  <div className="h-4 w-px bg-slate-300 mx-4"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
