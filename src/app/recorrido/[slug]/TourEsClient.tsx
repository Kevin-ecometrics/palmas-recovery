"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { getLocalizedPath } from "@/i18n/routeMap";
import { getTourPath, getTourSlugFromPath } from "@/i18n/slugRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PrivateRoomPage from "@/app/tour/private-room/page";
import SharedRoomPage from "@/app/tour/shared-room/page";
import VipSuitePage from "@/app/tour/vip-suite/page";

type Props = {
  slug: string;
};

export default function TourEsClient({ slug }: Props) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const canonicalSlug = getTourSlugFromPath(slug);

  useEffect(() => {
    if (currentLang === "en") {
      router.replace(getTourPath(canonicalSlug, "en"));
    }
  }, [currentLang, canonicalSlug, router]);

  if (canonicalSlug === "private-room") return <PrivateRoomPage />;
  if (canonicalSlug === "shared-room") return <SharedRoomPage />;
  if (canonicalSlug === "vip-suite") return <VipSuitePage />;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-3">{t("notFound.title")}</h1>
        <p className="text-gray-600 mb-6">{t("notFound.description")}</p>
        <Link
          href={getLocalizedPath("/", currentLang)}
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full"
        >
          {t("notFound.cta")}
        </Link>
      </div>
    </div>
  );
}
