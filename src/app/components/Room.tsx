"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

interface Destination {
  id: number;
  name: string;
  priceText: string;
  image: string;
  url?: string;
  alt?: string;
}

const imageHeights = [
  "h-[260px] sm:h-[420px]",
  "h-[300px] sm:h-[480px]",
  "h-[320px] sm:h-[500px]",
];

export default function HotelDestinationsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [isDraggingState, setIsDraggingState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pathname = usePathname();

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Shared Room",
      priceText: "$170 dlls / night",
      image:
        "/Conoce las comodas habitaciones compartidas para tu recuperacion en la mejor clinica de recuperacion.jpg",
      url: pathname === "/en/" ? "/rooms" : "/habitaciones",
      alt: "Conoce las comodas habitaciones compartidas para tu recuperación con precios accesibles en la mejor clínica de recuperación en Tijuana a 10 min del cruce fronterizo ",
    },
    {
      id: 2,
      name: "Private Room",
      image:
        "/Amplia habitacion con sofa cama y vista para paciente y acompanate con todas las amenidades incluidas en Tijuana.jpg",
      priceText: "$180 dlls / night",
      url: pathname === "/en/" ? "/rooms" : "/habitaciones",
      alt: "Amplia habitación con sofá para acompañante, closet y cama   hospitalaria con amplia vista y acompáñate con todas las amenidades incluidas en Tijuana ",
    },
    {
      id: 3,
      name: "VIP Suite",
      priceText: "$200 dlls / night",
      image:
        "/Habitacion privada con bano completo para total comodidad en tu recuperacion solo en Palmas Recovery.jpg",
      url: pathname === "/en/" ? "/rooms" : "/habitaciones",
      alt: "En Palmas recovery contamos con habitaciones VIP con baño privada y excelente vista para tu comodidad  ",
    },
    {
      id: 4,
      name: "Lymphatic massage",
      priceText: "$60 dlls",
      image:
        "/Servicio de masaje linfatipo para una recuperacion efectiva en Palmas Recovery con una fisioterapeuta.jpg",
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "En Palmas recovery contamos con habitaciones VIP con baño privada y excelente vista para tu comodidad  ",
    },
    {
      id: 5,
      name: "5 Lymphatic massages package",
      priceText: "$270 dlls",
      image:
        "/Obten 5 masajes linfaticos postquirurgicos a precio especial seleccionando nuestro paquete en Palmas recovery en Tijuana.jpeg",
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "Paquete de 5 masajes linfáticos para tu estadía con una masajista experta en nuestras instalaciones ",
    },
    {
      id: 6,
      name: "Original Recovery bra sytle No. B01G",
      priceText: "$80 dlls",
      image:
        "/Anade a tu carrito un brasier de compresion postquirurgica con ajuste completo en Palmas Recovery.png",
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "Puedes comprar en Palmas Recovery tu brasier lavable y de cierre frontal de compresión postquirgica  ",
    },
    {
      id: 7,
      name: "Open Bust Vest 3/4 Lengh Sleeves Style No. FVOM",
      priceText: "$80 dlls",
      image: "/Faja torerita con apertura en el busto.png",
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "Compra tu faja torerita con apeetura en el busto en Palmas Recovery  ",
    },
    {
      id: 8,
      name: "Reinforced Girdle with High Back and Layered Panels Short Lenght Style No. SFBHRS",
      priceText: "$140 dlls",
      image:
        "/Compra fácil tu Faja con espalda alta de short arriba de las rodillas en Palmas Recovery.png",
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "Agenda tu estancia En Palmas Recovery y Compra fácil tu Faja con espalda alta de short arriba de las rodillas en",
    },
    {
      id: 9,
      name: "Girdle With High Back No Closures Short Lenght Style No. SFBHS2",
      priceText: "$140 dlls",
      image:
        "/Compra la faja  con espalda alta sin costuras de short arriba de las rodillas.png",
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "En PR puedes encontrar la faja que necesitas como la faja de espalda alta sin costuras",
    },
  ];

  const TOTAL_DOTS = 7;

  const getActiveDotIndex = () => {
    const totalItems = destinations.length;
    const ratio = currentIndex / (totalItems - 1);
    const dotIndex = Math.round(ratio * (TOTAL_DOTS - 1));
    return Math.min(Math.max(dotIndex, 0), TOTAL_DOTS - 1);
  };

  const scrollToDot = (dotIndex: number) => {
    if (!containerRef.current) return;
    const cardWidth = 300;
    const gap = 24;
    const targetItemIndex = Math.round((dotIndex / (TOTAL_DOTS - 1)) * (destinations.length - 1));
    const scrollLeft = targetItemIndex * (cardWidth + gap);
    containerRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    const cardWidth = 300;
    const gap = 24;
    
    if (sLeft >= maxScroll - 10) {
      setCurrentIndex(destinations.length - 1);
    } else {
      const newIndex = Math.round(sLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(newIndex, destinations.length - 1));
    }
  }, [destinations.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition, { passive: true });
      checkScrollPosition();
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [checkScrollPosition]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
    setIsDraggingState(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const walk = (e.pageX - startX.current) * 1.2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
    setIsDraggingState(false);
  };

  const scrollProgress = (currentIndex + 1) / destinations.length;

  return (
    <section className="bg-[#f5f3ef] py-16 sm:py-20 px-4 sm:px-8 md:px-10 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-[42px] font-serif text-gray-800 mb-10 sm:mb-16 max-w-xl sm:max-w-3xl leading-snug whitespace-nowrap text-center mx-auto">
          {t("destinations.title")}
        </h1>

        {/* DRAG CONTAINER */}
        <div
          ref={containerRef}
          className={`
            flex gap-6 sm:gap-10 md:gap-14 overflow-x-auto md:overflow-hidden 
            select-none snap-x snap-mandatory md:snap-none touch-pan-x 
            pr-6 md:pr-0 
            [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]
            transition-all duration-300
            ${isDraggingState ? "cursor-grabbing" : "cursor-grab"}
          `}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          {destinations.map((item, index) => {
            const isOdd = index % 2 === 1;
            const isActive = index === currentIndex;

            return (
              <div
                key={item.id}
                className={`
                  flex-none w-[260px] sm:w-[300px] md:w-[360px] snap-start
                  transition-all duration-300
                  ${isActive ? "scale-[1.02]" : "scale-100"}
                `}
              >
                <div className="flex flex-col gap-4">
                  {/* TEXTO ARRIBA */}
                  {isOdd && (
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                      className="space-y-1"
                    >
                      <h3 className="text-base sm:text-xl font-serif text-gray-800 group-hover:text-wine transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.priceText}
                      </p>
                    </motion.div>
                  )}

                  {/* IMAGEN */}
                  <motion.div
                    className={`
                      relative rounded-xl overflow-hidden shadow-lg
                      transition-shadow duration-300
                      ${isActive ? "shadow-2xl shadow-wine/25" : "shadow-md"}
                    `}
                    whileHover={{ y: -4 }}
                  >
                    <a href={item.url || "#"} className="block">
                      <motion.img
                        src={item.image}
                        alt={item.alt}
                        title={item.alt}
                        draggable={false}
                        className={`w-full object-cover ${
                          imageHeights[index % imageHeights.length]
                        }`}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

                      <motion.button
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:bg-wine hover:text-white transition-colors"
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IoAdd className="w-5 h-5 text-gray-800" />
                      </motion.button>

                      {/* Badge */}
                      {item.id <= 3 && (
                        <div className="absolute bottom-4 left-4">
                          <span
                            className={`
                            px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider
                            ${item.id === 1 ? "bg-blush/90 text-wine" : ""}
                            ${item.id === 2 ? "bg-sage/90 text-white" : ""}
                            ${item.id === 3 ? "bg-wine/90 text-white" : ""}
                          `}
                          >
                            {item.id === 1
                              ? "Popular"
                              : item.id === 2
                                ? "Recommended"
                                : "Premium"}
                          </span>
                        </div>
                      )}
                    </a>
                  </motion.div>

                  {/* TEXTO ABAJO */}
                  {!isOdd && (
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                      className="space-y-1"
                    >
                      <h3 className="text-base sm:text-xl font-serif text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.priceText}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores de navegación */}
        <div className="flex flex-col items-center mt-8 gap-4">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_DOTS }).map((_, index) => {
              const isActive = index === getActiveDotIndex();
              return (
                <button
                  key={index}
                  onClick={() => scrollToDot(index)}
                  className={`
                    transition-all duration-300 rounded-full cursor-pointer
                    ${isActive ? "w-8 h-3 bg-wine" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"}
                  `}
                  aria-label={`Go to section ${index + 1}`}
                />
              );
            })}
          </div>

          {/* Barra de progreso */}
          <div className="w-48 sm:w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-wine to-blush rounded-full"
              initial={false}
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
