"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

function SpherePanorama({ image, rotation }: { image: string; rotation: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      (error) => console.error("Error al cargar la textura:", error)
    );
  }, [image]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation.current.y;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[500, 128, 128]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>
      {loading && (
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[5, 1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      )}
    </>
  );
}

export default function Panorama360() {
  const rotation = useRef({ y: 0 });
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const [activeImage, setActiveImage] = useState("/studio_small_09_4k.jpg");
  const { t } = useTranslation();

  const images = [
    { src: "/studio_small_09_4k.jpg", key: "studio" },
    { src: "/empty_play_room_2k.jpg", key: "playRoom" },
    { src: "/river_alcove_4k.jpg", key: "riverAlcove" },
    { src: "/moon_lab_4k.jpg", key: "moonLab" },
    { src: "/german_town_street_4k.jpg", key: "germanTown" },
  ];

  // Inercia
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

  return (
    <div className="w-full h-screen bg-black relative">
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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

      {/* Indicador */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
        {t("panorama.dragHint")}
      </div>

      {/* Galería */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 overflow-x-auto px-4 py-2 bg-black/40 backdrop-blur-sm rounded-xl">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img.src)}
            className={`relative w-24 h-16 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all duration-300 ${
              activeImage === img.src
                ? "border-white scale-105"
                : "border-transparent hover:scale-105 opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={img.src}
              alt={t(`panorama.labels.${img.key}`)}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs text-white py-1">
              {t(`panorama.labels.${img.key}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
