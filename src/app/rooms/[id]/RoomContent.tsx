"use client";

import { Room } from "../rooms.data";
import Link from "next/link";
import {
  FaUsers,
  FaBed,
  FaShieldAlt,
  FaUtensils,
  FaTv,
  FaWind,
  FaBath,
  FaKey,
  FaStar,
} from "react-icons/fa";
import {
  MdZoomOutMap,
  MdLocalHospital,
  MdCleaningServices,
  MdPrivacyTip,
} from "react-icons/md";
import { GiMedicalPack } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";

type Props = {
  room: Room;
};

export default function RoomContent({ room }: Props) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  
  // Verifica que room existe antes de acceder a sus propiedades
  if (!room || !room.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-principal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  // Usar valores por defecto si las traducciones fallan
  const name = t(`rooms.${room.id}.name`, { defaultValue: room.name || "Room" });
  const subtitle = t(`rooms.${room.id}.subtitle`, { defaultValue: room.subtitle || "" });
  const tagline = t(`rooms.${room.id}.tagline`, { defaultValue: room.tagline || "" });
  const description = t(`rooms.${room.id}.description`, { defaultValue: room.description || "" });
  const beds = t(`rooms.${room.id}.beds`, { defaultValue: room.beds || "" });
  const size = t(`rooms.${room.id}.size`, { defaultValue: room.size || "" });
  
  // Usar valores por defecto para arrays
  const amenities = t(`rooms.${room.id}.amenities`, { 
    returnObjects: true,
    defaultValue: room.amenities || [] 
  }) as string[];
  
  const features = t(`rooms.${room.id}.features`, { 
    returnObjects: true,
    defaultValue: room.features || [] 
  }) as string[];
  
  const heroTitle = t("destinations.title", { defaultValue: "Premium Recovery Suites" });

  const getAmenityIcon = (amenity: string) => {
    const normalized = amenity.toLowerCase();
    if (normalized.includes("medical") || normalized.includes("médic"))
      return <GiMedicalPack className="text-principal text-lg" />;
    if (normalized.includes("bathroom") || normalized.includes("baño"))
      return <FaBath className="text-principal text-lg" />;
    if (normalized.includes("air conditioning") || normalized.includes("aire acondicionado"))
      return <FaWind className="text-principal text-lg" />;
    if (normalized.includes("tv"))
      return <FaTv className="text-principal text-lg" />;
    if (normalized.includes("private entrance") || normalized.includes("entrada privada"))
      return <FaKey className="text-principal text-lg" />;
    return <FaStar className="text-principal text-lg" />;
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative min-h-screen h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={room.image || "/default-room.jpg"}
            alt={t(`rooms.${room.id}.imageAlt`, { defaultValue: name })}
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        {/* Contenido del hero */}
        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              {subtitle && (
                <div className="inline-flex items-center gap-2 bg-principal/20 backdrop-blur-sm border border-principal/30 text-principal px-6 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-principal rounded-full animate-pulse" />
                  <span className="font-bold tracking-widest text-sm uppercase">
                    {subtitle}
                  </span>
                </div>
              )}

              {/* Title principal */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight text-center whitespace-pre-line">
                {heroTitle}
              </h1>
              
              {/* Nombre de la habitación */}
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4 leading-tight text-center">
                {name}
              </h2>

              {/* Tagline */}
              {tagline && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-px bg-white/50" />
                  <p className="text-2xl text-white/90 italic font-light">
                    {tagline}
                  </p>
                  <div className="w-16 h-px bg-white/50" />
                </div>
              )}

              {/* Description */}
              {description && (
                <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}

              {/* Price in Hero */}
              <div className="mt-10 p-6 bg-white/10 backdrop-blur-sm rounded-2xl inline-block border border-white/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    ${room.price || 0}
                  </span>
                  <span className="text-white/70">{t("common.perNight")}</span>
                </div>
                <p className="text-sm text-white/60 mt-1">
                  {t("roomDetail.allInclusive")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* DETAILS CARD */}
            <div className="lg:col-span-2 space-y-12">
              {/* Room Specifications */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px bg-principal" />
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    {t("roomDetail.roomSpecs")}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {beds && (
                      <div className="flex items-center gap-4 group">
                        <div className="p-3 bg-principal/10 rounded-xl group-hover:scale-110 transition-transform">
                          <FaBed className="text-principal text-2xl" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t("roomDetail.bedType")}</p>
                          <p className="text-lg font-semibold">{beds}</p>
                        </div>
                      </div>
                    )}

                    {size && (
                      <div className="flex items-center gap-4 group">
                        <div className="p-3 bg-principal/10 rounded-xl group-hover:scale-110 transition-transform">
                          <MdZoomOutMap className="text-principal text-2xl" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t("roomDetail.roomSize")}</p>
                          <p className="text-lg font-semibold">{size}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 group">
                      <div className="p-3 bg-principal/10 rounded-xl group-hover:scale-110 transition-transform">
                        <FaUsers className="text-principal text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t("roomDetail.capacity")}</p>
                        <p className="text-lg font-semibold">
                          {t("searchBar.accommodates", { count: room.capacity || 1 })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Medical Features */}
                    {features.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <MdLocalHospital className="text-principal" />
                          {t("roomDetail.medicalFeatures")}
                        </h3>
                        <div className="space-y-3">
                          {features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-gray-700"
                            >
                              <div className="w-2 h-2 bg-principal rounded-full" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Premium Amenities */}
              {amenities.length > 0 && (
                <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-px bg-principal" />
                    <h2 className="text-3xl font-serif font-bold text-gray-900">
                      {t("roomDetail.premiumAmenities")}
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                      >
                        <div className="p-3 bg-principal/10 rounded-lg group-hover:bg-principal/20 transition-colors">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="font-medium text-gray-800">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* BOOKING CARD */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 p-10 rounded-3xl shadow-2xl border border-gray-200">
                {/* Price Highlight */}
                <div className="text-center mb-8">
                  <p className="text-sm text-gray-500 mb-2">
                    {t("roomDetail.startingFrom")}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-bold text-gray-900">
                      ${room.price || 0}
                    </span>
                    <span className="text-gray-600 text-lg">{t("common.perNight")}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {t("roomDetail.taxesIncluded")}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaShieldAlt className="text-principal" />
                    <span className="text-sm">{t("roomDetail.medicalAssistance")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaUtensils className="text-principal" />
                    <span className="text-sm">{t("roomDetail.allMeals")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MdCleaningServices className="text-principal" />
                    <span className="text-sm">{t("roomDetail.dailyCleaning")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MdPrivacyTip className="text-principal" />
                    <span className="text-sm">{t("roomDetail.privacy")}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="group/btn relative w-full bg-black text-white font-bold py-5 overflow-hidden transition-all hover:shadow-2xl rounded-full mb-6"
                  onClick={() => {
                    window.location.href = `/book?room=${room.id}`;
                  }}
                >
                  <span className="relative z-10 tracking-wider text-lg">
                    {t("roomDetail.bookThisRoom")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-principal to-principal transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 rounded-full" />
                </button>

                {/* Additional Info */}
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-500">
                    {t("roomDetail.instantConfirmation")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("roomDetail.secureBooking")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("roomDetail.bestPrice")}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400">
                      {t("roomDetail.needHelp")} {" "}
                      <Link
                        href={getLocalizedPath("/contact", currentLang)}
                        className="text-principal font-semibold hover:underline"
                      >
                        {t("roomDetail.contactTeam")}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="bg-gradient-to-r from-principal/10 to-principal/5 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            {t("roomDetail.readyTitle")}
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("roomDetail.readyDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                window.location.href = `/book?room=${room.id}`;
              }}
              className="px-12 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-all shadow-lg"
            >
              {t("roomDetail.bookNow")}
            </button>
            <button className="px-12 py-4 border-2 border-gray-300 text-gray-800 font-bold rounded-full hover:border-black hover:bg-white transition-all">
              {t("roomDetail.scheduleTour")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}