"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

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
      (error) => console.error("Error loading texture:", error),
    );
  }, [image]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation.current.y;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 128, 128]} />
      <meshBasicMaterial side={THREE.BackSide} />
    </mesh>
  );
}

const images = [
  { src: "/360/test.jpg", key: "playRoom" },
  { src: "/empty_play_room_2k.jpg", key: "playRoom" },
  { src: "/river_alcove_4k.jpg", key: "riverAlcove" },
  { src: "/moon_lab_4k.jpg", key: "moonLab" },
  { src: "/german_town_street_4k.jpg", key: "germanTown" },
];

export default function Panorama360() {
  const rotation = useRef({ y: 0 });
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const { t } = useTranslation();

  const activeImage = images[activeIndex].src;

  // Hide drag hint after first interaction
  const handleFirstDrag = useCallback(() => {
    if (showHint) setShowHint(false);
  }, [showHint]);

  // Inertia loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (!isDragging.current && Math.abs(velocity.current) > 0.0001) {
        rotation.current.y += velocity.current;
        velocity.current *= 0.95;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    handleFirstDrag();
  };

  const handleMouseUp = () => (isDragging.current = false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime.current;
    const deltaX = e.clientX - lastX.current;
    rotation.current.y += deltaX * 0.003;
    velocity.current = deltaTime > 0 ? ((deltaX * 0.003) / deltaTime) * 16 : 0;
    lastX.current = e.clientX;
    lastTime.current = currentTime;
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastX.current = e.touches[0].clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    handleFirstDrag();
  };

  const handleTouchEnd = () => (isDragging.current = false);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime.current;
    const deltaX = e.touches[0].clientX - lastX.current;
    rotation.current.y += deltaX * 0.003;
    velocity.current = deltaTime > 0 ? ((deltaX * 0.003) / deltaTime) * 16 : 0;
    lastX.current = e.touches[0].clientX;
    lastTime.current = currentTime;
  };

  const selectImage = (index: number) => {
    if (index === activeIndex) return;
    setIsLoading(true);
    setActiveIndex(index);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        :root {
          --gold: #c9a96e;
          --gold-dim: rgba(201, 169, 110, 0.4);
          --white: #f0ece4;
          --dim: rgba(240, 236, 228, 0.5);
          --bg: #080808;
          --glass: rgba(8, 8, 8, 0.65);
        }

        .panorama-root {
          width: 100%;
          height: 100vh;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          font-family: 'DM Mono', monospace;
        }

        /* Vignette overlay */
        .panorama-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%);
          pointer-events: none;
          z-index: 2;
        }

        .canvas-wrapper {
          width: 100%;
          height: 100%;
          cursor: grab;
        }

        .canvas-wrapper:active {
          cursor: grabbing;
        }

        /* Top bar */
        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-icon {
          width: 28px;
          height: 28px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-icon::after {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--gold);
          border-radius: 50%;
        }

        .brand-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 300;
          letter-spacing: 0.35em;
          color: var(--white);
          text-transform: uppercase;
        }

        .scene-counter {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--dim);
        }

        .scene-counter span {
          color: var(--gold);
        }

        /* Drag hint */
        .drag-hint {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          pointer-events: none;
          transition: opacity 0.6s ease;
        }

        .drag-hint.hidden {
          opacity: 0;
        }

        .hint-ring {
          width: 56px;
          height: 56px;
          border: 1px solid var(--gold-dim);
          border-radius: 50%;
          position: relative;
          animation: pulse-ring 2.5s ease-in-out infinite;
        }

        .hint-ring::after {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          animation: pulse-ring 2.5s ease-in-out infinite 0.4s;
        }

        .hint-arrows {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 10px;
          color: var(--gold);
          font-size: 12px;
        }

        .hint-text {
          font-size: 10px;
          letter-spacing: 0.25em;
          color: var(--dim);
          text-transform: uppercase;
        }

        @keyframes pulse-ring {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Loading overlay */
        .loading-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          background: rgba(8, 8, 8, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .loading-overlay.hidden {
          opacity: 0;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 1px solid var(--gold-dim);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Gallery */
        .gallery {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 0 32px 28px;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
        }

        .gallery-track {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 8px 0;
        }

        .gallery-track::-webkit-scrollbar {
          display: none;
        }

        .gallery-item {
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          outline: none;
          background: transparent;
          border: none;
          padding: 0;
        }

        .gallery-item.inactive {
          width: 72px;
          height: 48px;
          opacity: 0.45;
          filter: grayscale(0.6);
        }

        .gallery-item.inactive:hover {
          opacity: 0.75;
          filter: grayscale(0.2);
          transform: translateY(-2px);
        }

        .gallery-item.active {
          width: 100px;
          height: 66px;
          opacity: 1;
          filter: none;
          box-shadow: 0 0 0 1px var(--gold), 0 8px 24px rgba(201, 169, 110, 0.2);
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 4px 6px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--white);
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
          transition: opacity 0.3s ease;
        }

        .gallery-item.inactive .gallery-label {
          opacity: 0;
        }

        .gallery-item.inactive:hover .gallery-label {
          opacity: 1;
        }

        /* Active indicator dot */
        .gallery-item.active::before {
          content: '';
          position: absolute;
          top: 6px;
          right: 6px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
          z-index: 2;
          box-shadow: 0 0 6px var(--gold);
        }

        /* Progress bar */
        .progress-bar {
          display: flex;
          gap: 4px;
          margin-bottom: 12px;
          justify-content: center;
        }

        .progress-dot {
          height: 2px;
          border-radius: 1px;
          background: rgba(255,255,255,0.2);
          transition: all 0.4s ease;
          flex: 1;
          max-width: 28px;
        }

        .progress-dot.active {
          background: var(--gold);
          box-shadow: 0 0 6px var(--gold-dim);
        }

        /* Compass */
        .compass {
          position: absolute;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .compass-ring {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(240,236,228,0.15);
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compass-n {
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          color: var(--gold);
          letter-spacing: 0.1em;
          position: absolute;
          top: 4px;
        }

        .compass-label {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--dim);
          text-transform: uppercase;
        }
      `}</style>

      <div className="panorama-root">
        {/* Canvas interaction layer */}
        <div
          className="canvas-wrapper"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
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

        {/* Loading */}
        <div className={`loading-overlay ${isLoading ? "" : "hidden"}`}>
          <div className="loading-spinner" />
        </div>

        {/* Top bar */}
        <div className="top-bar">
          <div className="brand">
            <div className="brand-icon" />
            <span className="brand-label">Panorama</span>
          </div>
          <span className="scene-counter">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            {" / "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* Drag hint */}
        <div className={`drag-hint ${showHint ? "" : "hidden"}`}>
          <div className="hint-ring">
            <div className="hint-arrows">← →</div>
          </div>
          <span className="hint-text">{t("panorama.dragHint")}</span>
        </div>

        {/* Compass */}
        <div className="compass">
          <div className="compass-ring">
            <span className="compass-n">N</span>
          </div>
          <span className="compass-label">360°</span>
        </div>

        {/* Gallery */}
        <div className="gallery">
          <div className="progress-bar">
            {images.map((_, i) => (
              <div
                key={i}
                className={`progress-dot ${i === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
          <div className="gallery-track">
            {images.map((img, i) => (
              <button
                key={i}
                className={`gallery-item ${i === activeIndex ? "active" : "inactive"}`}
                onClick={() => selectImage(i)}
                aria-label={t(`panorama.labels.${img.key}`)}
              >
                <img
                  src={img.src}
                  alt={t(`panorama.labels.${img.key}`)}
                  className="gallery-img"
                />
                <span className="gallery-label">
                  {t(`panorama.labels.${img.key}`)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
