"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";
import { logger } from "@/utils/logger";

interface PanoramaImage {
  src: string;
  key: string;
}

interface Panorama360Props {
  images: PanoramaImage[];
  brandName?: string;
  className?: string;
}

function SpherePanorama({ image, rotation }: { image: string; rotation: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loader = new THREE.TextureLoader();
    loader.load(
      image,
      (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.x = -1;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = 16;

        if (meshRef.current) {
          const mat = meshRef.current.material as THREE.MeshBasicMaterial;
          mat.map = tex;
          mat.needsUpdate = true;
        }
        setLoading(false);
      },
      undefined,
      (error) => logger.error("Error loading texture:", error),
    );
  }, [image]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation.current.y;
      meshRef.current.rotation.x = rotation.current.x;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 128, 128]} />
      <meshBasicMaterial side={THREE.BackSide} />
    </mesh>
  );
}

export default function Panorama360({
  images,
  brandName = "PALMAS RECOVERY",
  className = "",
}: Panorama360Props) {
  const rotation = useRef({ y: 0, x: 0 });
  const velocity = useRef({ y: 0, x: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const activeImage = images[activeIndex]?.src || "";

  const handleFirstDrag = useCallback(() => {
    if (showHint) setShowHint(false);
  }, [showHint]);

  // Auto-scroll to show the active image in the gallery
  useEffect(() => {
    if (galleryRef.current && activeIndex >= 0) {
      const activeButton = galleryRef.current.children[
        activeIndex
      ] as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  // Hide scroll hint after user scrolls
  const handleGalleryScroll = useCallback(() => {
    if (showScrollHint) setShowScrollHint(false);
  }, [showScrollHint]);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (!isDragging.current) {
        if (Math.abs(velocity.current.y) > 0.0001) {
          rotation.current.y += velocity.current.y;
          velocity.current.y *= 0.95;
        }
        if (Math.abs(velocity.current.x) > 0.0001) {
          rotation.current.x += velocity.current.x;
          velocity.current.x *= 0.95;
          // Limit vertical rotation to avoid flipping
          rotation.current.x = Math.max(
            -Math.PI / 2.5,
            Math.min(Math.PI / 2.5, rotation.current.x),
          );
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    velocity.current = { y: 0, x: 0 };
    handleFirstDrag();
  };

  const handleMouseUp = () => (isDragging.current = false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime.current;
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;

    // INVERTED: Moving mouse right should rotate view left (negative direction)
    // This creates natural "dragging the world" feeling
    rotation.current.y -= deltaX * 0.005;
    // Vertical rotation - inverted as well for natural feel
    rotation.current.x -= deltaY * 0.005;
    // Limit vertical rotation
    rotation.current.x = Math.max(
      -Math.PI / 2.5,
      Math.min(Math.PI / 2.5, rotation.current.x),
    );

    // Calculate velocity for inertia (also inverted)
    if (deltaTime > 0) {
      velocity.current.y = (-(deltaX * 0.005) / deltaTime) * 16;
      velocity.current.x = (-(deltaY * 0.005) / deltaTime) * 16;
    }

    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = currentTime;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent gallery scroll from interfering with panorama drag
    const target = e.target as HTMLElement;
    if (target.closest(".gallery-container")) {
      return;
    }
    isDragging.current = true;
    lastPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    lastTime.current = Date.now();
    velocity.current = { y: 0, x: 0 };
    handleFirstDrag();
  };

  const handleTouchEnd = () => (isDragging.current = false);

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent gallery scroll from interfering with panorama drag
    const target = e.target as HTMLElement;
    if (target.closest(".gallery-container")) {
      return;
    }
    if (!isDragging.current) return;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime.current;
    const deltaX = e.touches[0].clientX - lastPos.current.x;
    const deltaY = e.touches[0].clientY - lastPos.current.y;

    // INVERTED: Moving finger right should rotate view left
    rotation.current.y -= deltaX * 0.005;
    // Vertical rotation - inverted for natural feel
    rotation.current.x -= deltaY * 0.005;
    // Limit vertical rotation
    rotation.current.x = Math.max(
      -Math.PI / 2.5,
      Math.min(Math.PI / 2.5, rotation.current.x),
    );

    // Calculate velocity for inertia (inverted)
    if (deltaTime > 0) {
      velocity.current.y = (-(deltaX * 0.005) / deltaTime) * 16;
      velocity.current.x = (-(deltaY * 0.005) / deltaTime) * 16;
    }

    lastPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    lastTime.current = currentTime;
  };

  const selectImage = (index: number) => {
    if (index === activeIndex) return;
    setIsLoading(true);
    setActiveIndex(index);
    // Reset rotation when changing images for a fresh start
    rotation.current = { y: 0, x: 0 };
    velocity.current = { y: 0, x: 0 };
    setTimeout(() => setIsLoading(false), 600);
  };

  // Normalize rotation for display (optional - for compass if needed)
  const normalizedYRotation =
    ((rotation.current.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const compassDirection = Math.round(
    (normalizedYRotation / (Math.PI * 2)) * 360,
  );

  return (
    <div
      className={`w-full h-screen bg-black relative overflow-hidden ${className}`}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/75 pointer-events-none z-20" />

      {/* Canvas interaction layer */}
      <div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <Canvas
          camera={{ fov: 100, position: [0, 0, 0.1] }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            precision: "highp",
          }}
        >
          <SpherePanorama image={activeImage} rotation={rotation} />
        </Canvas>
      </div>

      {/* Loading overlay */}
      <div
        className={`absolute inset-0 z-30 bg-black/85 flex items-center justify-center transition-opacity duration-400 pointer-events-none ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-10 h-10 border border-amber-500/40 border-t-amber-500 rounded-full animate-spin" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-5 h-5 md:w-7 md:h-7 border border-amber-500 rounded-full flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full" />
          </div>
          <span className=" text-xs md:text-[15px] font-light tracking-[0.25em] md:tracking-[0.35em] text-amber-50 uppercase">
            {brandName}
          </span>
        </div>
        <span className="text-[10px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] text-amber-50/50">
          <span className="text-amber-500">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {/* Drag hint */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none transition-opacity duration-600 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14">
          <div className="absolute inset-0 border border-amber-500/40 rounded-full animate-[pulse-ring_2.5s_ease-in-out_infinite]" />
          <div className="absolute inset-0 m-1.5 border border-amber-500 rounded-full animate-[pulse-ring_2.5s_ease-in-out_infinite_0.4s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 text-amber-500 text-[10px] md:text-xs">
            ← → ↑ ↓
          </div>
        </div>
        <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] text-amber-50/50 uppercase">
          {t("panorama.dragHint")}
        </span>
      </div>

      {/* Compass - shows current orientation */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5">
        <div className="w-8 h-8 md:w-10 md:h-10 border border-amber-50/15 rounded-full flex items-center justify-center relative">
          <span className=" text-[8px] md:text-[10px] text-amber-500 tracking-[0.1em] absolute top-1">
            N
          </span>
          {/* Compass indicator */}
          <div
            className="absolute w-0.5 h-2 md:h-3 bg-amber-500/60 rounded-full origin-bottom"
            style={{
              transform: `rotate(${compassDirection}deg)`,
              bottom: "50%",
              transformOrigin: "bottom center",
            }}
          />
        </div>
        <span className="text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em] text-amber-50/50 uppercase">
          {compassDirection}°
        </span>
      </div>

      {/* Gallery */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-3 md:px-8 pb-4 md:pb-7 bg-gradient-to-t from-black/90 to-transparent">
        {/* Progress indicators */}
        <div className="flex gap-1 mb-2 md:mb-3 justify-center px-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-400 ${
                images.length <= 10
                  ? "flex-1 max-w-7"
                  : "w-4 md:w-6 flex-shrink-0"
              } ${
                i === activeIndex
                  ? "bg-amber-500 shadow-[0_0_6px_rgba(201,169,110,0.4)]"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint for mobile */}
        {showScrollHint && images.length > 4 && (
          <div className="flex justify-center mb-2 md:hidden">
            <div className="bg-amber-500/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 animate-pulse">
              <svg
                className="w-3 h-3 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-[8px] tracking-wide text-amber-500 uppercase font-medium">
                {t("panorama.scrollHint") || "Desliza para ver más fotos"}
              </span>
              <svg
                className="w-3 h-3 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Horizontal scrollable gallery */}
        <div
          ref={galleryRef}
          className="gallery-container flex gap-2 md:gap-2.5 overflow-x-auto scrollbar-hide pb-2 md:pb-2 px-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={handleGalleryScroll}
        >
          {images.map((img, i) => (
            <button
              key={i}
              className={`relative flex-shrink-0 cursor-pointer rounded overflow-hidden transition-all duration-400 outline-none border-none p-0 bg-transparent group ${
                i === activeIndex
                  ? "w-[80px] h-[54px] md:w-[100px] md:h-[66px] opacity-100 shadow-[0_0_0_1px_#c9a96e,0_8px_24px_rgba(201,169,110,0.2)]"
                  : "w-[60px] h-[40px] md:w-[72px] md:h-12 opacity-45 grayscale-[0.6] hover:opacity-75 hover:grayscale-[0.2] hover:-translate-y-0.5"
              }`}
              onClick={() => selectImage(i)}
              aria-label={t(`panorama.labels.${img.key}`)}
            >
              <img
                src={img.src}
                alt={t(`panorama.labels.${img.key}`)}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute bottom-0 left-0 right-0 px-1 py-0.5 md:px-1.5 md:py-1 text-[6px] md:text-[8px] tracking-[0.08em] md:tracking-[0.12em] uppercase text-amber-50 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 truncate ${
                  i === activeIndex
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {t(`panorama.labels.${img.key}`)}
              </span>
              {i === activeIndex && (
                <div className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-500 z-10 shadow-[0_0_6px_#c9a96e]" />
              )}
            </button>
          ))}
        </div>

        {/* Indicator showing there are more images */}
        {images.length > 5 && (
          <div className="flex justify-center mt-1 md:mt-2 md:hidden">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, images.length) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      Math.floor((activeIndex / images.length) * 5) === i
                        ? "bg-amber-500 w-2"
                        : "bg-white/30"
                    }`}
                  />
                ),
              )}
              {images.length > 5 && (
                <div className="w-1 h-1 rounded-full bg-white/30" />
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.5s ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
