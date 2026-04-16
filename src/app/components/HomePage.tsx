"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Hero = dynamic(() => import("./HeroVideo"), {
  ssr: true,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-white">
        PALMAS
      </h1>
    </div>
  ),
});
const SearchBar = dynamic(() => import("./SearchBar"), { ssr: false });
const AnimationHero = dynamic(() => import("./AnimationHero"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />,
});
const Banner = dynamic(() => import("./Banner"), { ssr: false });
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });
const About = dynamic(() => import("./About"), { ssr: false });
const Room = dynamic(() => import("./Room"), { ssr: false });
const AudienceSelector = dynamic(() => import("./AudienceSelector"), {
  ssr: false,
});
const UniqueHotels = dynamic(() => import("./UniqueHotels"), { ssr: false });
const InfiniteImageBanner = dynamic(() => import("./InfiniteImageBanner"), {
  ssr: false,
});
const BannerAbout = dynamic(() => import("./BannerAbout"), { ssr: false });
const BannerWithImage = dynamic(() => import("./BannerWithImage"), {
  ssr: false,
});
const Blogs = dynamic(() => import("./Blogs"), { ssr: false });

export default function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const pathname = usePathname();

  const pleasureParagraphs = useMemo(
    () => t("home.pleasure.paragraphs", { returnObjects: true }) as string[],
    [t],
  );

  const aboutLink = useMemo(
    () => (pathname === "/en/" ? "/about" : "/nosotros"),
    [pathname],
  );

  const titleLine1 = useMemo(() => t("home.pleasure.titleLine1"), [t]);
  const subtitleLine1 = useMemo(() => t("home.pleasure.subtitleLine1"), [t]);
  const subtitleLine2 = useMemo(() => t("home.pleasure.subtitleLine2"), [t]);
  const moreLabel = useMemo(() => t("home.pleasure.more"), [t]);

  const heroScrollHandler = useRef((e: Event) => {
    const customEvent = e as CustomEvent<{ showNavbar: boolean }>;
    setShowNavbar(customEvent.detail.showNavbar);
  });

  useEffect(() => {
    window.addEventListener("heroScroll", heroScrollHandler.current);
    return () =>
      window.removeEventListener("heroScroll", heroScrollHandler.current);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { root: null, threshold: 0.1, rootMargin: "100px" },
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
      <section className="relative px-6 md:px-8 py-20 lg:py-24 bg-[#fffaf6]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.15] tracking-tight">
              {titleLine1}
              <br />
            </h2>
          </header>

          <div>
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
              <div className="relative">
                <img
                  src="/La casa de recuperacion numero uno para cirugias plasticas en Tijuana.webp"
                  alt="La casa de recuperación número uno para cirugía plástica en Tijuana hecha por médicos y enfermeras certificadas "
                  title="La casa de recuperación número uno para cirugía plástica en Tijuana hecha por médicos y enfermeras certificadas "
                  className="w-full h-[420px] md:h-[520px] object-cover"
                  width={924}
                  height={520}
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  sizes="(max-width: 768px) 100vw, 924px"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-gray-600 leading-relaxed space-y-4 text-base mb-4">
                    {pleasureParagraphs.slice(0, 1).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4 leading-snug">
                    {subtitleLine1}
                    <br />
                    {subtitleLine2}
                  </h3>

                  <a
                    href={aboutLink}
                    aria-label={moreLabel}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b border-gray-900/50 hover:border-gray-900 transition-colors"
                  >
                    {moreLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UniqueHotels />
      <BannerAbout />
      <Room />
      <AudienceSelector />
      <Blogs />
      <InfiniteImageBanner />
      <About />
      <BannerWithImage />
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
