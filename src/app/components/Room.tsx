"use client";

import React, { useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";

interface Destination {
  id: number;
  name: string;
  hotels: number;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Barcelona",
    hotels: 1,
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  },
  {
    id: 2,
    name: "Madrid",
    hotels: 5,
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
  },
  {
    id: 3,
    name: "San Sebastian",
    hotels: 1,
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  },
  {
    id: 4,
    name: "Seville",
    hotels: 1,
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
  },
  {
    id: 5,
    name: "Madrid",
    hotels: 5,
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
  },
  {
    id: 6,
    name: "San Sebastian",
    hotels: 1,
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
  },
  {
    id: 7,
    name: "Seville",
    hotels: 1,
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
  },
];

const imageHeights = ["h-[420px]", "h-[480px]", "h-[500px]"];

export default function HotelDestinationsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

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
          Choose your destination and explore our hotels
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
                        {item.hotels} {item.hotels === 1 ? "Hotel" : "Hotels"}
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
                        {item.hotels} {item.hotels === 1 ? "Hotel" : "Hotels"}
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
