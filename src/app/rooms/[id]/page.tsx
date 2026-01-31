"use client";

import Link from "next/link";
import { ROOMS } from "../rooms.data";
import RoomContent from "./RoomContent";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";
import { getRoomPath } from "@/i18n/slugRoutes";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const roomId = typeof params?.id === "string" ? params.id : "";
  const room = ROOMS.find((r) => r.id === roomId);
  const otherRooms = useMemo(
    () => ROOMS.filter((r) => r.id !== roomId),
    [roomId]
  );

  useEffect(() => {
    if (!room) {
      router.replace(getLocalizedPath("/rooms", currentLang));
    }
  }, [room, router, currentLang]);

  if (!room) return null;

  return (
    <section className="min-h-screen bg-white">
      <RoomContent room={room} />

      {/* RECOMMENDED ROOMS */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-principal/10 text-principal px-6 py-2 rounded-full mb-6">
              <span className="font-bold tracking-widest text-sm uppercase">
                {t("roomDetail.exploreMore")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              {t("roomDetail.discoverOtherSuites")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("roomDetail.otherSuitesDescription")}
            </p>
          </div>

          {/* Room Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherRooms.map((otherRoom) => (
              <Link
                key={otherRoom.id}
                href={getRoomPath(otherRoom.id, currentLang)}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={otherRoom.image}
                      alt={t(`rooms.${otherRoom.id}.imageAlt`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-principal text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                        {t(`rooms.${otherRoom.id}.highlight`)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-principal tracking-wider uppercase">
                        {t(`rooms.${otherRoom.id}.subtitle`)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          ${otherRoom.price}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {t("common.perNight")}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                      {t(`rooms.${otherRoom.id}.name`)}
                    </h3>
                    <p className="text-gray-600 italic mb-4">
                      {t(`rooms.${otherRoom.id}.tagline`)}
                    </p>

                    {/* Quick Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-xs" />
                        <span>
                          {t("searchBar.accommodates", {
                            count: otherRoom.capacity,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdZoomOutMap className="text-xs" />
                        <span>{t(`rooms.${otherRoom.id}.size`)}</span>
                      </div>
                    </div>

                    {/* Amenities Preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(() => {
                        const amenities = t(`rooms.${otherRoom.id}.amenities`, {
                          returnObjects: true,
                        }) as string[];

                        return (
                          <>
                            {amenities.slice(0, 2).map((amenity, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                              >
                                {amenity}
                              </span>
                            ))}
                            {amenities.length > 2 && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                +{amenities.length - 2} {t("roomDetail.more")}
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    {/* CTA Arrow */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                      <span className="text-gray-700 font-medium">
                        {t("roomDetail.viewDetails")}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-principal transition-colors group-hover:translate-x-2 duration-300">
                        <FaArrowLeft className="transform rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to All Rooms */}
          <div className="text-center mt-16">
            <Link
              href={getLocalizedPath("/rooms", currentLang)}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-800 font-bold rounded-full hover:border-black hover:bg-gray-50 transition-all group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              {t("roomDetail.viewAllRooms")}
              <span className="text-gray-400 group-hover:text-black">
                ({ROOMS.length} {t("roomDetail.total")})
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
