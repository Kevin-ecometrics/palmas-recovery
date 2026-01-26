"use client";
import { useEffect, useState } from "react";
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
      <Hero />
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
      <SearchBar floating={showNavbar} />
      <Banner />

      {/* Sección Our Promise existente */}
      <section className="relative flex items-center justify-center px-6 md:px-12 py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl text-center space-y-10">
          {/* Etiqueta */}
          <div className="inline-block px-5 py-2 border border-gray-300/40 rounded-full text-sm uppercase tracking-[0.2em] text-gray-700 bg-white/60 backdrop-blur-sm shadow-sm transition-transform duration-300 hover:scale-105">
            Our Promise
          </div>

          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 leading-tight">
            Rest, Recover, Renew
          </h2>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Each room is thoughtfully crafted for your comfort, privacy, and
            healing — ensuring every moment of your recovery feels like home.
          </p>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {[
              {
                title: "Comfort",
                desc: "Thoughtfully designed spaces for peace and relaxation.",
              },
              {
                title: "Privacy",
                desc: "Your personal sanctuary for uninterrupted recovery.",
              },
              {
                title: "Healing",
                desc: "A nurturing environment that promotes well-being.",
              },
            ].map((item, i) => (
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
