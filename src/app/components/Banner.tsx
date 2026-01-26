"use client";
import React, { useEffect, useRef } from "react";

const Banner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Duplicar contenido para efecto infinito
    const content = container.innerHTML;
    container.innerHTML += content;

    let isPaused = false;
    const speed = 1.2;

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
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 py-5 select-none border-y border-slate-200">
      <div className="flex items-center">
        {/* Parte FIJA a la izquierda */}
        <div className="w-[15%] flex-shrink-0 px-8 z-10 relative">
          <div className="inline-flex items-center gap-3 text-black px-5 py-2.5 rounded">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-semibold tracking-wide uppercase whitespace-nowrap">
              Ventajas Exclusivas:
            </span>
          </div>
        </div>

        {/* Contenedor del scroll con degradado en los bordes */}
        <div className="w-[85%] overflow-hidden relative">
          {/* Degradado izquierdo */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-white to-transparent z-10 pointer-events-none"></div>

          {/* Degradado derecho */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-white to-transparent z-10 pointer-events-none"></div>

          <div
            ref={containerRef}
            className="flex whitespace-nowrap will-change-transform items-center"
          >
            <div className="flex items-center mx-6 group">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Canjes disponibles
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300 mx-4"></div>

            <div className="flex items-center mx-6 group">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Late check-out hasta las 13:00 h
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300 mx-4"></div>

            <div className="flex items-center mx-6 group">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Promociones exclusivas
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300 mx-4"></div>

            <div className="flex items-center mx-6 group">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Mejor precio garantizado
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300 mx-4"></div>

            <div className="flex items-center mx-6 group">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Últimas habitaciones disponibles
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300 mx-4"></div>

            <div className="flex items-center mx-6 group">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Late check-out hasta las 13:00 h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
