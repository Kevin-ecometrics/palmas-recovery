"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUsers, FaBed } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ROOMS, Room as RoomType } from "./rooms.data";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";
import { getRoomPath } from "@/i18n/slugRoutes";

export default function RoomsPage() {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-5xl">
            <h1 className="text-7xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-none">
              {t("roomsPage.heroTitle")}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              {t("roomsPage.heroDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-10 py-5 bg-white text-black hover:text-white font-bold text-lg overflow-hidden transition-all hover:scale-105">
                <a href="#rooms" className="relative z-10">
                  {t("roomsPage.exploreRooms")}
                </a>
                <div className="absolute inset-0 bg-gradient-to-r from-principal to-principal transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              <Link
                href={getLocalizedPath("/contact", currentLang)}
                className="px-10 py-5 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-all text-center"
              >
                {t("roomsPage.contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div id="rooms" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-principal font-semibold tracking-widest text-sm mb-4 uppercase">
              {t("roomsPage.ourSpaces")}
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              {t("roomsPage.discoverTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("roomsPage.discoverDescription")}
            </p>
          </div>

          {/* Room Cards */}
          {ROOMS.map((room, index) => (
            <div key={room.id} className="mb-32 last:mb-0">
              {(() => {
                const name = t(`rooms.${room.id}.name`);
                const subtitle = t(`rooms.${room.id}.subtitle`);
                const tagline = t(`rooms.${room.id}.tagline`);
                const description = t(`rooms.${room.id}.description`);
                const beds = t(`rooms.${room.id}.beds`);
                const size = t(`rooms.${room.id}.size`);
                const amenities = t(`rooms.${room.id}.amenities`, {
                  returnObjects: true,
                }) as string[];
                const highlight = t(`rooms.${room.id}.highlight`);

                return (
              <div
                className={`group relative bg-white overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } lg:flex`}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                {/* Image */}
                <div className="lg:w-3/5 relative overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                  <img
                    src={room.image}
                    alt={t(`rooms.${room.id}.imageAlt`)}
                    className={`w-full h-full object-cover transition-all duration-[1.5s] ${
                      hoveredRoom === room.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute top-8 left-8 z-20 bg-principal text-white px-6 py-3 font-bold text-sm tracking-wider rounded-full shadow-2xl">
                    {highlight}
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-8 right-8 z-20 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                    {/* Si quisieras agregar precio original
                    {room.originalPrice && (
                      <div className="text-sm text-gray-500 line-through mb-1">
                        ${room.originalPrice}
                      </div>
                    )} */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gray-900">
                        ${room.price}
                      </span>
                      <span className="text-gray-600">{t("common.perNight")}</span>
                    </div>
                    {/* Si quisieras agregar ahorro
                    {room.originalPrice && (
                      <div className="text-xs text-principal font-semibold mt-1">
                        Save ${room.originalPrice - room.price}
                      </div>
                    )} */}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white rounded-3xl">
                  <p className="text-principal font-bold tracking-[0.3em] text-xs mb-3 uppercase">
                    {subtitle}
                  </p>
                  <h2 className="text-5xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                    {name}
                  </h2>
                  <p className="text-2xl text-gray-600 font-light italic mb-6">
                    {tagline}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-8 text-base">
                    {description}
                  </p>

                  {/* Details */}
                  <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-start gap-3">
                      <FaBed className="text-principal text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-800 text-sm leading-relaxed">
                        {beds}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MdZoomOutMap className="text-principal text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-800 text-sm leading-relaxed">
                        {size}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaUsers className="text-principal text-xl mt-1 flex-shrink-0" />
                      <span className="text-gray-800 text-sm leading-relaxed">
                        {t("searchBar.accommodates", { count: room.capacity })}
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <div className="w-8 h-px bg-principal"></div>
                      {t("roomsPage.amenitiesTitle")}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {amenities.map((amenity, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-gray-700 text-sm group/item"
                        >
                          <div className="w-1.5 h-1.5 bg-principal rotate-45 group-hover/item:scale-150 transition-transform"></div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA - Usando Link en lugar de botón */}
                  <Link
                    href={getRoomPath(room.id, currentLang)}
                    className="group/btn relative w-full bg-black text-white font-bold py-5 overflow-hidden transition-all hover:shadow-2xl rounded-full text-center"
                  >
                    <span className="relative z-10 tracking-wider text-sm">
                      {t("roomsPage.viewDetails")}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-principal to-principal transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 rounded-full"></div>
                  </Link>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    {t("roomsPage.limited")}
                  </p>
                </div>
              </div>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
