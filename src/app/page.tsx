"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimationHero from "./components/AnimationHero";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Hero from "./components/HeroVideo";
import Footer from "./components/Footer";
import About from "./components/About";
import SearchBar from "./components/SearchBar";
import Room from "./components/Room";
import AudienceSelector from "./components/AudienceSelector";
import UniqueHotels from "./components/UniqueHotels";
import InfiniteImageBanner from "./components/InfiniteImageBanner";
import BannerAbout from "./components/BannerAbout";
import BannerWithImage from "./components/BannerWithImage";

export default function Page() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleHeroScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ showNavbar: boolean }>;
      setShowNavbar(customEvent.detail.showNavbar);
    };

    window.addEventListener("heroScroll", handleHeroScroll);
    return () => window.removeEventListener("heroScroll", handleHeroScroll);
  }, []);

  return (
    <div className="bg-white relative text-black">
      <div className="relative">
        <Hero />
        <SearchBar floating={showNavbar} />
      </div>
      <AnimationHero />
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          showNavbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <Navbar />
      </div>
      <Banner />

      {/* Sección Our Promise existente */}
      <section className="relative flex items-center justify-center px-6 md:px-12 py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl text-center space-y-10">
          {/* Etiqueta */}
          <div className="inline-block px-5 py-2 border border-gray-300/40 rounded-full text-sm uppercase tracking-[0.2em] text-gray-700 bg-white/60 backdrop-blur-sm shadow-sm transition-transform duration-300 hover:scale-105">
            {t("home.promise.label")}
          </div>

          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 leading-tight">
            {t("home.promise.title")}
          </h2>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {t("home.promise.description")}
            </p>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
              {(t("home.promise.values", { returnObjects: true }) as Array<{
                title: string;
                desc: string;
              }>).map((item, i) => (
                <div
                  key={i}
                  className="space-y-3 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <h3 className="text-2xl font-semibold text-principal tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>
      <Room />
      <AudienceSelector />
      <UniqueHotels />
      <InfiniteImageBanner />
      <BannerAbout />
      <BannerWithImage />
      <About />
      <Footer />
    </div>
  );
}
