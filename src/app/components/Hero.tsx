"use client";

import React from "react";

type MediaType = "video" | "image";

interface HeroProps {
  mediaType?: MediaType;

  // Imagen
  imageSrc?: string;

  // Video
  videoSrc?: string;
  videoPoster?: string;

  // Contenido
  title: string;
  description?: string;

  // Estilo
  overlay?: boolean;
  overlayColor?: string; // ej: "bg-black/50"
  align?: "left" | "center" | "right";

  // Extra
  height?: string; // ej: "h-screen" | "h-[80vh]"
}

export default function Hero({
  mediaType = "image",
  imageSrc,
  videoSrc,
  videoPoster,

  title,
  description,

  overlay = true,
  overlayColor = "bg-black/40",
  align = "left",

  height = "h-screen",
}: HeroProps) {
  // Alineación dinámica
  const alignmentStyles = {
    left: "items-start text-left",
    center: "items-center text-center mx-auto",
    right: "items-end text-right ml-auto",
  };

  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      {/* MEDIA */}
      <div className="absolute inset-0 z-0">
        {mediaType === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={
              imageSrc ||
              "https://www.oneshothotels.com/data/webp/one-shot-hoteles-boutique-datos-de-contacto265-2810e7f4615f2738a257edd2efc0bd3f.webp"
            }
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* OVERLAY */}
      {overlay && <div className={`absolute inset-0 z-10 ${overlayColor}`} />}

      {/* CONTENT */}
      <div className="relative z-20 flex h-full px-6 md:px-16">
        <div
          className={`flex flex-col justify-center max-w-2xl text-white ${alignmentStyles[align]}`}
        >
          <h1 className="text-5xl md:text-7xl font-light italic mb-6 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
