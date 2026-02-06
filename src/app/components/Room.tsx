"use client";

import React, { useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Destination {
  id: number;
  name: string;
  priceText: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Shared Room",
    priceText: "$170 dlls / night",
    image:
      "/shared-room.jpg",
  },
  {
    id: 2,
    name: "Private Room",
    priceText: "$180 dlls / night",
    image:
      "/private-room.jpg",
  },
  {
    id: 3,
    name: "VIP Suite",
    priceText: "$200 dlls / night",
    image:
      "/vip-suite.jpeg",
  },
  {
    id: 4,
    name: "Lymphatic massage",
    priceText: "$60 dlls",
    image:
      "/lymphatic-massage.jpg",
  },
  {
    id: 5,
    name: "5 Lymphatic massages package",
    priceText: "$270 dlls",
    image:
      "/5-lymphatic-massages-package.jpg",
  },
  {
    id: 6,
    name: "Original Recovery bra sytle No. B01G",
    priceText: "$80 dlls",
    image:
      "/extra1-1.png",
  },
  {
    id: 7,
    name: "Open Bust Vest 3/4 Lengh Sleeves Style No. FVOM",
    priceText: "$80 dlls",
    image:
      "/extra2-1.png",
  },
  {
    id: 8,
    name:
      "Reinforced Girdle with High Back and Layered Panels Short Lenght Style No. SFBHRS",
    priceText: "$140 dlls",
    image:
      "/extra3-1.png",
  },
  {
    id: 9,
    name: "Girdle With High Back No Closures Short Lenght Style No. SFBHS2",
    priceText: "$140 dlls",
    image:
      "/extra4-1.png",
  },
];

const imageHeights = ["h-[420px]", "h-[480px]", "h-[500px]"];

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

  /* -------------------------------------------- */

  return (
    <section className="bg-[#f5f3ef] py-20 px-10 relative">
      {/* CURSOR CUSTOM */}
      {showCursor && (
        <div
          className="fixed z-50 pointer-events-none"
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
        <h1 className="text-[42px] font-serif text-gray-800 mb-16 max-w-3xl">
          {t("destinations.title")}
        </h1>

        {/* DRAG CONTAINER */}
        <div
          ref={containerRef}
          className="flex gap-14 overflow-hidden select-none cursor-none"
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
              <div key={item.id} className="flex-none w-[360px]">
                <div className="flex flex-col gap-4">
                  {/* TEXTO ARRIBA */}
                  {isOdd && (
                    <div>
                      <h3 className="text-xl font-serif text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.priceText}
                      </p>
                    </div>
                  )}

                  {/* IMAGEN */}
                  <div className="relative rounded-xl overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
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
                  </div>

                  {/* TEXTO ABAJO */}
                  {!isOdd && (
                    <div>
                      <h3 className="text-xl font-serif text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
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
