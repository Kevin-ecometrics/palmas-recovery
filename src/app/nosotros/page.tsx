"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import {
  FaShieldAlt,
  FaAward,
  FaCheckCircle,
  FaTimes,
  FaSearchPlus,
  FaExpand,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Link from "next/link";
import Hero from "../components/Hero";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero
        title="Sobre Nosotros"
        description="Nos inspiramos en la belleza y la cultura, que plasmamos en espacios diseñados para crear momentos únicos"
        height="h-[80dvh]"
        imageSrc="/about_palmas_banner.webp"
      />
      {/* Modal for full image */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-cream transition-colors z-10"
          >
            <FaTimes className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src="/coepris.png"
              alt="Certificación COEPRIS"
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <section className="bg-white py-32">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-cream/20">
            <img
              src="/logo.png"
              alt="Logo Palmas Recovery"
              className=" object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* COEPRIS Accreditation Section */}
      <section className="bg-gradient-to-br from-cream to-blush/20 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sage/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text content */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <FaShieldAlt className="w-6 h-6 text-wine" />
                    <span className="text-sm font-semibold text-wine uppercase tracking-wider">
                      Acreditación Oficial
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-wine mb-4">
                    Avalado por COFEPRIS
                  </h3>

                  <p className="text-olive-dark/80 mb-6">
                    Estamos certificados por la Comisión Estatal para la
                    Protección contra Riesgos Sanitarios, garantizando que
                    nuestras instalaciones y procedimientos cumplen con los más
                    altos estándares de calidad y seguridad sanitaria.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="w-5 h-5 text-sage" />
                      <span className="text-sm text-olive-dark">
                        Certificación vigente
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaAward className="w-5 h-5 text-wine" />
                      <span className="text-sm text-olive-dark">
                        Altos estándares de calidad
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image container with interactive message */}
                <div
                  className="relative h-64 md:h-80 bg-gradient-to-br from-wine to-olive-dark flex items-center justify-center p-8 group cursor-pointer overflow-hidden"
                  onClick={() => setModalOpen(true)}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cream"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-cream"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-cream"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cream"></div>
                  </div>

                  <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <img
                      src="/coepris.png"
                      alt="Certificación COEPRIS"
                      className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-cream rounded-full p-4 mb-2 mx-auto w-fit shadow-xl">
                        <FaSearchPlus className="w-8 h-8 text-wine" />
                      </div>
                      <span className="text-cream font-semibold text-lg block text-center">
                        Haz clic para ver la imagen completa
                      </span>
                      <span className="text-cream/80 text-sm block text-center mt-1">
                        Certificado oficial COEPRIS
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-wine/20">
                      <FaExpand className="w-4 h-4 text-wine" />
                      <span className="text-xs font-medium text-wine">
                        Ver certificado
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-blush rounded-full opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-28">
        <div className="max-w-8xl mx-auto">
          <div className="md:grid grid-cols-2">
            <header className="text-4xl md:text-5xl font-bold text-start mb-8 text-wine">
              Fundamos Palmas Recovery en 2021 con una visión compartida:
              redefinir la experiencia postoperatoria.
            </header>
            <div></div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-olive-dark ">
            <div className="md:grid grid-cols-2">
              <div></div>
              <h4 className="text-2xl font-light text-wine">
                Con más de ocho años de experiencia en hospitalidad médica y una
                sólida colaboración con los mejores cirujanos plásticos en
                México, priorizamos tus necesidades y objetivos postoperatorios.
              </h4>
            </div>

            <p>
              Entendemos que la recuperación es más efectiva cuando se aborda de
              manera integral. Desde procedimientos expertos hasta cuidados
              posteriores personalizados, cada paso de nuestro proceso está
              cuidadosamente diseñado para garantizar tu bienestar.
            </p>

            <p>Tus necesidades están en el centro de todo lo que hacemos.</p>

            <div className="py-16 px-6 md:px-16">
              <div className="grid md:grid-cols-2 items-center gap-12">
                <div className="relative w-full max-w-xl">
                  <img
                    src="https://www.oneshothotels.com/data/webp/historia-sobre-one-shot-hotels-hoteles-con-encanto-2949-4c85d93456192e5e4e69e0acb0c39fc2.webp"
                    alt=""
                    className="w-full h-[420px] object-cover rounded-xl"
                  />

                  <img
                    src="https://www.oneshothotels.com/data/webp/one-shot-hotels-nuestra-historia182-41251cc7d4deb29bfc1a964e51d3190a.webp"
                    alt=""
                    className="absolute -bottom-16 right-[-40px] w-[65%] h-[260px] object-cover rounded-xl shadow-2xl"
                  />
                </div>

                <div className="pt-10 max-w-lg">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-wine">
                    Misión
                  </h3>

                  <p className="text-xl font-semilight text-olive-dark">
                    Nuestra misión es brindar un entorno eficiente, oportuno y
                    acogedor que se sienta como un segundo hogar.
                  </p>

                  <h3 className="text-2xl font-semilight mt-8 text-wine mb-4">
                    Estamos comprometidos a ayudarte a lograr una recuperación
                    óptima, asegurando que regreses a casa con tranquilidad.
                  </h3>

                  <Link
                    href="/"
                    className="text-wine hover:text-olive-dark transition-colors font-medium mt-4 inline-block"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-16 px-6 md:px-12">
              <h2 className="text-4xl font-bold mb-10 text-wine">
                Nuestros pilares fundamentales
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blush p-8 rounded-sm">
                  <h3 className="text-2xl font-semibold text-wine mb-4">
                    Seguridad y acreditación:
                  </h3>
                  <p className="text-olive-dark leading-relaxed">
                    Tu salud es nuestra máxima prioridad. Garantizamos que toda
                    la atención esté respaldada por nuestra experiencia
                    profesional y las más altas acreditaciones médicas de
                    nuestro equipo.
                  </p>
                </div>

                <div className="bg-cream p-8 rounded-sm">
                  <h3 className="text-2xl font-semibold text-wine mb-4">
                    Apoyo experto:
                  </h3>
                  <p className="text-olive-dark leading-relaxed">
                    Brindamos orientación experta y continua durante todo tu
                    proceso de recuperación. No solo monitoreamos tu progreso;
                    caminamos contigo en cada paso del proceso.
                  </p>
                </div>

                <div className="bg-wine p-8 rounded-sm">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Flexibilidad y adaptabilidad:
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Entendemos que cada proceso de recuperación es único.
                    Nuestros servicios son completamente adaptables, sin
                    estancias mínimas ni máximas, para ajustarse a tus
                    necesidades individuales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
