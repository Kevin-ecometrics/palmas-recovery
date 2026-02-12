"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimationHero from "./AnimationHero";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Hero from "./HeroVideo";
import Footer from "./Footer";
import About from "./About";
import SearchBar from "./SearchBar";
import Room from "./Room";
import AudienceSelector from "./AudienceSelector";
import UniqueHotels from "./UniqueHotels";
import InfiniteImageBanner from "./InfiniteImageBanner";
import BannerAbout from "./BannerAbout";
import BannerWithImage from "./BannerWithImage";
import Blogs from "./Blogs";

export default function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const pleasureParagraphs = t("home.pleasure.paragraphs", {
    returnObjects: true,
  }) as string[];

  useEffect(() => {
    const handleHeroScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ showNavbar: boolean }>;
      setShowNavbar(customEvent.detail.showNavbar);
    };

    window.addEventListener("heroScroll", handleHeroScroll);
    return () => window.removeEventListener("heroScroll", handleHeroScroll);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white relative text-black">
      <div className="relative">
        <Hero />
        <SearchBar floating={showNavbar} hidden={footerVisible} />
      </div>
      <AnimationHero />
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          showNavbar && !footerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <Navbar />
      </div>
      <Banner />
      <section className="relative px-6 md:px-12 py-20 lg:py-24 bg-[#fffaf6]">

 <header className="mb-12 ml-12 md:ml-24 lg:ml-32 mr-6 md:mr-12">
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.15] tracking-tight text-left">
    {t("home.pleasure.titleLine1")}
    <br />
  </h2>
</header>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
              {/* Imagen */}
              <div className="relative">
                <img
                  src="/salon.jpg"
                  alt={t("home.pleasure.imageAlt")}
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </div>

              {/* Texto */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 leading-snug">
                    {t("home.pleasure.subtitleLine1")}
                    <br />
                    {t("home.pleasure.subtitleLine2")}
                  </h3>
                  <div className="text-gray-600 leading-relaxed space-y-4 text-base">
                    {pleasureParagraphs.slice(0, 1).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  <a
                    href="#about"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b border-gray-900/50 hover:border-gray-900 transition-colors"
                  >
                    {t("home.pleasure.more")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Room />
      <AudienceSelector />
      <Blogs />
      <UniqueHotels />
      <About />
      <InfiniteImageBanner />
      <BannerAbout />
      <BannerWithImage />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}