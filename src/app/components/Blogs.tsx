"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { getLocalizedPath, getRouteByKey, type RouteKey } from "@/i18n/routeMap";

const BLOG_POSTS: Array<{
  routeKey: RouteKey;
  image: string;
  en: { title: string; excerpt: string; category: string };
  es: { title: string; excerpt: string; category: string };
}> = [
  {
    routeKey: "blog1",
    image:
      "/Viaja con el mejor clima y agenda tu hospedaje para una recuperacion postoperatoria de primer nivel en tijuana en pr.jpg",
    en: {
      title: "When is the Best Time for Plastic Surgery in Mexico?",
      excerpt:
        "A comprehensive guide to choosing the optimal season for your cosmetic procedure and recovery in Mexico.",
      category: "Planning Guide",
    },
    es: {
      title: "¿Cuál es el mejor momento para una cirugía plástica en México?",
      excerpt:
        "Guía completa para elegir la mejor temporada para tu procedimiento estético y recuperación en México.",
      category: "Planeación",
    },
  },
  {
    routeKey: "blog2",
    image: "/images blog 4/Cirugia plastica en Tijuana con expertos.webp",
    en: {
      title: "Considering Plastic Surgery? Why Tijuana Is the Ideal Destination",
      excerpt:
        "Discover why Tijuana is the world's medical tourism capital and how to choose the right board-certified plastic surgeon for a safe, successful procedure.",
      category: "Plastic Surgery",
    },
    es: {
      title:
        "¿Estás considerando una cirugía plástica? Descubre por qué Tijuana es el destino ideal",
      excerpt:
        "Conoce por qué Tijuana es la meca del turismo médico y cómo elegir al cirujano plástico certificado correcto para un procedimiento seguro y exitoso.",
      category: "Cirugía Plástica",
    },
  },
  {
    routeKey: "blog3",
    image:
      "/Viaja a tijuana para tu cirugia plastica y recupera en palmas recovery.webp",
    en: {
      title: "What to Pack for Your Post-Op Recovery House",
      excerpt:
        "Your complete checklist for a stress-free recovery experience. Prepare like a pro with our essential packing guide.",
      category: "Recovery Preparation",
    },
    es: {
      title: "Qué empacar para tu casa de recuperación postoperatoria",
      excerpt:
        "Tu checklist completo para una recuperación sin estrés. Prepárate como un profesional con nuestra guía esencial.",
      category: "Preparación",
    },
  },
  {
    routeKey: "blog4",
    image:
      "/Recuperate mejor con expertos en el area de la salud con instalaciones de primer nivel para cuidados  postoperatorios.jpg",
    en: {
      title: "Recovery House vs. Hotel: Why Your Healing Depends on Professional Care",
      excerpt:
        "Understanding the critical differences between professional recovery care and standard hotel accommodations.",
      category: "Recovery Care",
    },
    es: {
      title:
        "Casa de recuperación vs. hotel: por qué tu recuperación depende del cuidado profesional",
      excerpt:
        "Conoce las diferencias clave entre el cuidado profesional postoperatorio y un alojamiento tradicional.",
      category: "Cuidado de recuperación",
    },
  },
  {
    routeKey: "blog5",
    image:
      "/imagenes blog 5/Palmas recovery es tu equipo con una casa de recuperación de primer nivel en Tijuana.webp",
    en: {
      title: "Are You a Plastic Surgeon? Partner with a Premier Recovery House in Tijuana",
      excerpt:
        "Learn how Palmas Recovery extends your team's excellence with COEPRIS-certified, 24/7 expert post-operative care that protects your patients and your reputation.",
      category: "For Surgeons",
    },
    es: {
      title:
        "¿Eres cirujano plástico? Extiende tu equipo con una casa de recuperación de primer nivel en Tijuana",
      excerpt:
        "Descubre cómo Palmas Recovery complementa tu práctica con cuidados postoperatorios certificados por COEPRIS, 24/7, que protegen a tus pacientes y tu reputación.",
      category: "Para Cirujanos",
    },
  },
];

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollByCard = (direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const cardWidth = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-16 sm:pt-28 lg:pt-36 pb-20 sm:pb-32 lg:pb-48 bg-[#fffaf6]">
      <div className="max-w-7xl mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] gap-12 items-start">
          <div className="text-black">
            <p className="text-2xl sm:text-3xl md:text-4xl leading-tight mb-5 sm:mb-6">
              {t("blogs.title")}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-black/70 mb-6 sm:mb-8 max-w-md">
              {t("blogs.subtitle")}
            </p>
            <Link
              href={getLocalizedPath("/blog", currentLang)}
              aria-label={t("blogs.viewAll")}
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black hover:bg-black/5 transition"
            >
              {t("blogs.viewAll")}
              <FaArrowRight />
            </Link>

            <div className="hidden lg:flex items-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => scrollByCard("prev")}
                disabled={!canScrollPrev}
                aria-label="Previous articles"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-black/20 text-black hover:bg-black/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("next")}
                disabled={!canScrollNext}
                aria-label="Next articles"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-black/20 text-black hover:bg-black/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="relative min-w-0 w-full">
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 w-full
                [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
            >
              {BLOG_POSTS.map((post) => {
                const content = post[currentLang];
                return (
                  <article
                    key={post.routeKey}
                    className="snap-start shrink-0 w-[78%] sm:w-[340px] bg-white/70 border border-black/10 rounded-2xl p-4 sm:p-5"
                  >
                    <div className="overflow-hidden">
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl">
                        <img
                          src={post.image}
                          alt={content.title}
                          title={content.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={300}
                        />
                        <span className="absolute bottom-3 right-3 bg-wine text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {content.category}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-black/10">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                          {t("blogs.kicker")}
                        </p>
                        <h3 className="text-xl font-semibold text-black mt-2 mb-3">
                          {content.title}
                        </h3>
                        <p className="text-sm text-black/70 leading-relaxed mb-4">
                          {content.excerpt}
                        </p>
                        <Link
                          href={getRouteByKey(post.routeKey, currentLang)}
                          aria-label={`${t("blogs.cta")}: ${content.title}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-black/70 transition-colors"
                        >
                          {t("blogs.cta")}
                          <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex lg:hidden items-center justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => scrollByCard("prev")}
                disabled={!canScrollPrev}
                aria-label="Previous articles"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black/20 text-black hover:bg-black/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("next")}
                disabled={!canScrollNext}
                aria-label="Next articles"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black/20 text-black hover:bg-black/5 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
