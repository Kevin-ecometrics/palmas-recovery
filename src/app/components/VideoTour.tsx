"use client";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";

interface VideoTourProps {
  videoSrc: string;
  poster?: string;
  brandName?: string;
}

export default function VideoTour({
  videoSrc,
  poster,
  brandName = "PALMAS RECOVERY",
}: VideoTourProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const isSpanish = pathname?.startsWith("/recorrido") ?? false;
  const lng: "es" | "en" = isSpanish ? "es" : "en";
  const lobbyHref = isSpanish ? "/recorrido/360/lobby" : "/tour/360/lobby";
  const tourSelectorHref = isSpanish ? "/recorrido/360" : "/tour/360";

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(tourSelectorHref);
    }
  }, [router, tourSelectorHref]);

  return (
    <div
      className="w-full h-screen bg-black relative overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/75 pointer-events-none z-20" />

      <video
        src={videoSrc}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        draggable={false}
        controlsList="nodownload noremoteplayback nofullscreen"
        disablePictureInPicture
        disableRemotePlayback
        onDragStart={(e) => e.preventDefault()}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label={t("panorama.back", { lng })}
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-cream/30 bg-black/20 text-cream hover:bg-black/40 hover:border-cream/60 transition-colors backdrop-blur-sm cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-5 h-5 md:w-7 md:h-7 border border-blush rounded-full flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blush rounded-full" />
            </div>
            <span className="text-xs md:text-[15px] font-light tracking-[0.25em] md:tracking-[0.35em] text-cream uppercase">
              {brandName}
            </span>
          </div>
        </div>

        <a
          href={lobbyHref}
          aria-label={t("panorama.goToLobby", { lng })}
          className="flex items-center gap-1.5 px-2.5 md:px-4 py-1.5 md:py-2 rounded-full border border-blush/60 bg-wine/70 text-cream text-[10px] md:text-xs uppercase tracking-[0.15em] hover:bg-wine transition-colors backdrop-blur-sm"
        >
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 11l9-8 9 8M5 9.5V19a1 1 0 001 1h4a1 1 0 001-1v-4h2v4a1 1 0 001 1h4a1 1 0 001-1V9.5"
            />
          </svg>
          <span className="hidden sm:inline">
            {t("panorama.goToLobby", { lng })}
          </span>
        </a>
      </div>
    </div>
  );
}
