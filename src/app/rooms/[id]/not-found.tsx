"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";

// app/rooms/[id]/not-found.tsx
export default function NotFound() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{t("notFound.title")}</h2>
      <p>{t("notFound.description")}</p>
      <Link href={getLocalizedPath("/rooms", currentLang)} className="underline">
        {t("roomDetail.viewAllRooms")}
      </Link>
    </div>
  );
}
