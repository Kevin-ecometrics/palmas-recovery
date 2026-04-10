"use client";

import React, { useRef, useState } from "react";
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

  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  /* ---------------- DRAG LOGIC ---------------- */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (!isDragging.current || !containerRef.current) return;

    const walk = (e.pageX - startX.current) * 1.2; // velocidad
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

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
        "/Servicio de masaje linfatipo para una recuperacion efectiva en Palmas Recovery con una fisioterapeuta.jpg", // Masaje de drenaje linfático
      url: pathname === "/en/" ? "/book" : "/reservar",
      alt: "En Palmas recovery contamos con habitaciones VIP con baño privada y excelente vista para tu comodidad  ",
    },
    {
      id: 5,
      name: "5 Lymphatic massages package",
      priceText: "$270 dlls",
      image:
        "/Obten 5 masajes linfaticos postquirurgicos a precio especial seleccionando nuestro paquete en Palmas recovery en Tijuana.jpeg", // Promoción de 5 tipos de masajes
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

  /* -------------------------------------------- */

  return (
    <section className="bg-[#f5f3ef] py-16 sm:py-20 px-6 sm:px-10 relative">
      {/* CURSOR CUSTOM */}
      {showCursor && (
        <div
          className="fixed z-50 pointer-events-none hidden md:block"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
            &lt;&gt;
          </div>
        </div>
      )}

      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-[42px] font-serif text-gray-800 mb-10 sm:mb-16 max-w-xl sm:max-w-3xl leading-snug whitespace-nowrap text-center mx-auto">
          {t("destinations.title")}
        </h1>

        {/* DRAG CONTAINER */}
        <div
          ref={containerRef}
          className="flex gap-6 sm:gap-10 md:gap-14 overflow-x-auto md:overflow-hidden select-none cursor-auto md:cursor-none snap-x snap-mandatory md:snap-none touch-pan-x pr-6 md:pr-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={() => {
            stopDragging();
            setShowCursor(false);
          }}
          onMouseEnter={() => setShowCursor(true)}
        >
          {destinations.map((item, index) => {
            const isOdd = index % 2 === 1;

            return (
              <div
                key={item.id}
                className="flex-none w-[260px] sm:w-[300px] md:w-[360px] snap-start"
              >
                <div className="flex flex-col gap-4">
                  {/* TEXTO ARRIBA */}
                  {isOdd && (
                    <div>
                      <h3 className="text-base sm:text-xl font-serif text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.priceText}
                      </p>
                    </div>
                  )}

                  {/* IMAGEN */}
                  <div className="relative rounded-xl overflow-hidden">
                    <a href={item.url || "#"} className="block">
                      <motion.img
                        src={item.image}
                        alt={item.alt}
                        title={item.alt}
                        draggable={false}
                        className={`w-full object-cover ${
                          imageHeights[index % imageHeights.length]
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />

                      <motion.button
                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm"
                        whileHover={{ rotate: 90, scale: 1.1 }}
                      >
                        <IoAdd className="w-4 h-4 text-gray-800" />
                      </motion.button>
                    </a>
                  </div>

                  {/* TEXTO ABAJO */}
                  {!isOdd && (
                    <div>
                      <h3 className="text-base sm:text-xl font-serif text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {item.priceText}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
