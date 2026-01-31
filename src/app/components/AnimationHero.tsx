"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getTourPath } from "@/i18n/slugRoutes";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const masksRef = useRef<HTMLDivElement[]>([]);
  const titlesRef = useRef<HTMLDivElement[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const slides = t("home.hero.slides", { returnObjects: true }) as Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
  }>;

  const getSlideImage = (id: string) => {
    switch (id) {
      case "shared-room":
        return "/shared-room.jpg";
      case "private-room":
        return "/private-room.jpg";
      case "vip-suite":
        return "/vip-suite.jpeg";
      default:
        return "/shared-room.jpg";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = imagesRef.current;
      const masks = masksRef.current;
      const titles = titlesRef.current;

      if (!images.length || !masks.length || !titles.length) return;

      // Estado inicial
      gsap.set(images, { scale: 1.2, transformOrigin: "center center" });
      gsap.set(masks, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(masks[0], { clipPath: "circle(100% at 50% 50%)" });
      gsap.set(titles, { autoAlpha: 0, y: 60 });
      gsap.set(titles[0], { autoAlpha: 1, y: 0 });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${slides.length * 2000}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * slides.length),
              slides.length - 1
            );
            setCurrentSlide(index);
          },
        },
      });

      // Animaciones por slide con duración uniforme
      let accumulatedTime = 0;
      const mainDuration = 2.4; // duración principal por slide

      images.forEach((_, i) => {
        if (i === 0) return;

        const startTime = accumulatedTime;

        // Animaciones del slide anterior
        tl.to(
          titles[i - 1],
          { autoAlpha: 0, y: -60, duration: 1.2, ease: "power2.inOut" },
          startTime
        );
        tl.to(
          masks[i - 1],
          {
            clipPath: "circle(0% at 50% 50%)",
            duration: 2.2,
            ease: "power3.inOut",
          },
          startTime
        );
        tl.to(
          images[i - 1],
          { scale: 1.4, duration: 2.2, ease: "power3.inOut" },
          startTime
        );

        // Animaciones del slide actual
        tl.fromTo(
          masks[i],
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(100% at 50% 50%)",
            duration: mainDuration,
            ease: "power3.out",
          },
          startTime + 1.2
        );
        tl.to(
          images[i],
          { scale: 1, duration: mainDuration, ease: "power3.out" },
          startTime + 1.2
        );
        tl.to(
          titles[i],
          { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" },
          startTime + 2
        );

        accumulatedTime += mainDuration; // siguiente slide empieza después de la duración principal
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const section = containerRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const showNavbar = rect.bottom <= window.innerHeight * 0.3;
      window.dispatchEvent(
        new CustomEvent("heroScroll", { detail: { showNavbar } })
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (overlayRef.current) {
      // Empezamos con el overlay cubriendo todo con un círculo grande
      gsap.set(overlayRef.current, {
        clipPath: "circle(150% at 50% 50%)",
      });

      // Animación para que el círculo se achique y revele la imagen
      gsap.to(overlayRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setShowOverlay(false);
        },
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Overlay oscuro inicial */}
      {showOverlay && (
        <div ref={overlayRef} className="absolute inset-0 bg-black z-30"></div>
      )}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) masksRef.current[i] = el;
          }}
          className="absolute inset-0"
        >
          <img
            ref={(el) => {
              if (el) imagesRef.current[i] = el;
            }}
            src={getSlideImage(slide.id)}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) titlesRef.current[i] = el;
            }}
            className="absolute text-center px-6 max-w-4xl"
          >
            <div className="mb-3 text-sm md:text-base text-white/70 uppercase tracking-[0.3em] font-light">
              {slide.subtitle}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-bold tracking-tight mb-6 leading-none">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
              {slide.description}
            </p>
            <div className="mt-8 pointer-events-auto">
              <Link href={getTourPath(slide.id, currentLang)}>
                <span
                  className="group relative inline-flex px-10 py-4 
      bg-transparent border-2 border-white rounded-xl 
      text-white text-sm uppercase tracking-[0.2em] 
      overflow-hidden transition-all duration-500"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  {t("home.hero.viewTour")}
                  </span>

                  <span
                    className="absolute inset-0 bg-white transform -translate-x-full 
        group-hover:translate-x-0 transition-transform duration-500 ease-out"
                  />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-700 ${
              i === currentSlide
                ? "w-12 bg-white"
                : i < currentSlide
                ? "w-8 bg-white/50"
                : "w-8 bg-white/20"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-white/60 text-xs uppercase tracking-[0.2em] font-light">
          {t("home.hero.scroll")}
        </span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div>

      <div className="absolute top-8 right-8 text-white/60 text-sm font-light tracking-wider z-20">
        <span className="text-white text-2xl font-light">
          {currentSlide + 1}
        </span>
        <span className="mx-2">/</span>
        <span>{slides.length}</span>
      </div>
    </section>
  );
}
