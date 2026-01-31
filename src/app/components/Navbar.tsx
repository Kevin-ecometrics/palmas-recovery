"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isHome = usePathname() === "/";
  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";

  // Estado para controlar el navbar sticky
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: t("navbar.items.home"), path: "/" },
    { label: t("navbar.items.book"), path: "/book" },
    { label: t("navbar.items.services"), path: "/services" },
    { label: t("navbar.items.contact"), path: "/contact" },
    { label: t("navbar.items.panorama"), path: "/panorama" },
  ];

  const handleLanguageChange = (lng: "es" | "en") => {
    if (lng === currentLang) return;
    i18n.changeLanguage(lng);
    localStorage.setItem("appLanguage", lng);
    const canonical = getLocalizedPath(pathname, "en");
    router.replace(getLocalizedPath(canonical, lng), { scroll: false });
  };

  // Efecto para manejar scroll y cambiar estado sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = getLocalizedPath(
      pathname === "/" ? "/" : pathname.replace(/\/$/, ""),
      "en"
    ); // eliminar slash final
    const index = navItems.findIndex((item) => item.path === currentPath);
    if (index !== -1) setActiveIndex(index);
    else setActiveIndex(0); // fallback a HOME
  }, [pathname]);

  // Variantes para animaciones
  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // power3.out equivalent
      },
    }),
  };

  const socialIconVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.6,
        ease: "easeOut", // power2.out equivalent
      },
    }),
  };

  const mobileMenuVariantsSimple: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isScrolled ? -20 : 0,
        transition: { duration: 0.3 },
      }}
      className="w-full bg-[#fffaf6] border-b text-black border-black fixed top-1 md:top-5 left-0 z-50"
    >
      {/* Línea superior */}
      <div className="h-1 bg-principal w-full md:block hidden"></div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Botón hamburguesa (mobile) */}
        <button
          className="flex flex-col gap-1 md:hidden group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RiCloseFill className="text-2xl mb-4" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RiMenuFill className="text-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Links desktop + Logo */}
        <nav className="hidden md:flex items-center space-x-8 text-sm tracking-widest font-medium">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <button
                onClick={() => router.push(getLocalizedPath(item.path, currentLang))}
                className={`hover:text-principal transition-colors ${
                  i === activeIndex ? "text-principal font-bold" : ""
                }`}
              >
                {item.label}
              </button>
            </motion.div>
          ))}
          
          {/* Logo después de PANORAMA */}
          <motion.div
            custom={navItems.length}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            className="ml-4"
          >
            <button
              onClick={() => router.push(getLocalizedPath("/", currentLang))}
              className="flex items-center"
            >
              <figure>
                <img
                  src="/logo.png"
                  alt={t("navbar.logoAlt") || "Logo"}
                  className="h-8 w-auto object-contain hover:opacity-80 transition-opacity"
                />
              </figure>

            </button>
          </motion.div>
        </nav>

        {/* Redes */}
        <div className="hidden md:flex items-center space-x-4 text-black">
          {[FaInstagram, FaTiktok, FaFacebookF].map((Icon, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={socialIconVariants}
            >
              <Icon className="hover:text-principal cursor-pointer transition-colors" />
            </motion.div>
          ))}
          <div className="flex items-center border border-black/20 rounded-full overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => handleLanguageChange("es")}
              aria-disabled={currentLang === "es"}
              className={`px-3 py-1 transition-colors ${
                currentLang === "es"
                  ? "bg-black text-white opacity-80"
                  : "bg-transparent text-black"
              }`}
            >
              {t("common.spanish")}
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              aria-disabled={currentLang === "en"}
              className={`px-3 py-1 transition-colors ${
                currentLang === "en"
                  ? "bg-black text-white opacity-80"
                  : "bg-transparent text-black"
              }`}
            >
              {t("common.english")}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <motion.div
        variants={mobileMenuVariantsSimple}
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        className="overflow-hidden md:hidden flex flex-col px-6 text-sm tracking-widest font-medium bg-[#fffaf6]"
      >
        <div className="pb-6">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <button
                onClick={() => {
                  router.push(getLocalizedPath(item.path, currentLang));
                  setMenuOpen(false);
                }}
                className={`py-2 border-b border-black text-left hover:text-principal transition-colors block w-full ${
                  i === activeIndex ? "text-principal font-bold" : ""
                }`}
              >
                {item.label}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-start space-x-4 py-4"
        >
          {[FaInstagram, FaTiktok, FaFacebookF].map((Icon, i) => (
            <Icon
              key={i}
              className="hover:text-principal cursor-pointer transition-colors"
            />
          ))}
          <div className="flex items-center border border-black/20 rounded-full overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => handleLanguageChange("es")}
              aria-disabled={currentLang === "es"}
              className={`px-3 py-1 transition-colors ${
                currentLang === "es"
                  ? "bg-black text-white opacity-80"
                  : "bg-transparent text-black"
              }`}
            >
              {t("common.spanish")}
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              aria-disabled={currentLang === "en"}
              className={`px-3 py-1 transition-colors ${
                currentLang === "en"
                  ? "bg-black text-white opacity-80"
                  : "bg-transparent text-black"
              }`}
            >
              {t("common.english")}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex-col md:flex-row items-center justify-between text-center text-xs uppercase tracking-[0.2em] py-6 border-t border-black"
        >
          <div className="w-full md:w-1/3 flex justify-center text-black mb-4 md:mb-0">
            <div>
              <p className="font-semibold">{t("brand.name")}</p>
              <p>{t("brand.tagline")}</p>
            </div>
          </div>

          <div className="w-full text-principal text-6xl font-[serif]">
            <img
              src="/logo.png"
              alt={t("navbar.logoAlt")}
              title={t("navbar.logoAlt")}
              className="w-auto h-auto mx-auto"
            />
          </div>

          <div className="w-full md:w-1/3 flex justify-center text-black mt-4 md:mt-0">
            <div>
              <p>{t("brand.address.line1")}</p>
              <p>{t("brand.address.line2")}</p>
              <p>{t("brand.address.line3")}</p>
              <p>{t("brand.address.line4")}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;