"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isHome = usePathname() === "/";
  const pathname = usePathname();
  const router = useRouter();

  // Estado para controlar el navbar sticky
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "BOOK TODAY", path: "/book" },
    { label: "SERVICES", path: "/services" },
    { label: "CONTACT US", path: "/contact" },
    { label: "PANORAMA", path: "/panorama" },
  ];

  // Efecto para manejar scroll y cambiar estado sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = pathname === "/" ? "/" : pathname.replace(/\/$/, ""); // eliminar slash final
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

  const mobileMenuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.5, ease: "easeInOut" as const },
        opacity: { duration: 0.3, ease: "easeOut" as const },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.5, ease: "easeInOut" as const },
        opacity: { duration: 0.3, delay: 0.1, ease: "easeOut" as const },
      },
    },
  };

  // Alternativa más simple para el menú móvil
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
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

        {/* Links desktop */}
        <nav className="hidden md:flex space-x-8 text-sm tracking-widest font-medium">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <button
                onClick={() => router.push(item.path)}
                className={`hover:text-principal transition-colors ${
                  i === activeIndex ? "text-principal font-bold" : ""
                }`}
              >
                {item.label}
              </button>
            </motion.div>
          ))}
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
        </div>
      </div>

      {/* Menú móvil - Usando la versión simple */}
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
                  router.push(item.path);
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex-col md:flex-row items-center justify-between text-center text-xs uppercase tracking-[0.2em] py-6 border-t border-black"
        >
          <div className="w-full md:w-1/3 flex justify-center text-black mb-4 md:mb-0">
            <div>
              <p className="font-semibold">Palmas Recovery</p>
              <p>POST-OP &amp; RECOVERY</p>
            </div>
          </div>

          <div className="w-full text-principal text-6xl font-[serif]">
            <img
              src="/logo.png"
              alt="Logo Palmas"
              title="Logo Palmas"
              className="w-auto h-auto mx-auto"
            />
          </div>

          <div className="w-full md:w-1/3 flex justify-center text-black mt-4 md:mt-0">
            <div>
              <p>Fray Servando Teresa de Mier</p>
              <p>15-Interior 2</p>
              <p>Zona Urbana Rio Tijuana</p>
              <p>22010 Tijuana, B.C.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Logo e info */}
      {isHome && (
        <div className="flex-col md:flex-row items-center justify-between text-center text-xs uppercase tracking-[0.2em] py-6 border-t border-black md:flex hidden">
          <div className="w-full md:w-1/3 flex justify-center text-black mb-4 md:mb-0">
            <div>
              <p className="font-semibold">Palmas Recovery</p>
              <p>POST-OP &amp; RECOVERY</p>
            </div>
          </div>

          <div className="w-full text-principal text-6xl font-[serif]">
            <img
              src="/logo.png"
              alt="Logo Palmas"
              title="Logo Palmas"
              className="w-auto h-auto mx-auto"
            />
          </div>

          <div className="w-full md:w-1/3 flex justify-center text-black mt-4 md:mt-0">
            <div>
              <p>Fray Servando Teresa de Mier</p>
              <p>15-Interior 2</p>
              <p>Zona Urbana Rio Tijuana</p>
              <p>22010 Tijuana, B.C.</p>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
