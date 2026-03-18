"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaShieldAlt,
  FaAward,
  FaCheckCircle,
  FaTimes,
  FaSearchPlus,
  FaExpand,
} from "react-icons/fa";

export default function NosotrosPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Modal para imagen completa */}
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
              alt="Palmas Recovery Logo"
              className=" object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Sección de acreditación COEPRIS */}
      <section className="bg-gradient-to-br from-cream to-blush/20 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sage/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Contenido textual */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <FaShieldAlt className="w-6 h-6 text-wine" />
                    <span className="text-sm font-semibold text-wine uppercase tracking-wider">
                      Acreditación Oficial
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-wine mb-4">
                    Avalados por COEPRIS
                  </h3>

                  <p className="text-olive-dark/80 mb-6">
                    Contamos con la certificación de la Comisión Estatal para la
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
                        Alta calidad
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenedor de imagen con mensaje interactivo */}
                <div
                  className="relative h-64 md:h-80 bg-gradient-to-br from-wine to-olive-dark flex items-center justify-center p-8 group cursor-pointer overflow-hidden"
                  onClick={() => setModalOpen(true)}
                >
                  {/* Marco decorativo */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cream"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-cream"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-cream"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cream"></div>
                  </div>

                  {/* Imagen con efecto de zoom */}
                  <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <img
                      src="/coepris.png"
                      alt="Certificación COEPRIS"
                      className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  {/* Mensaje principal al hacer hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-cream rounded-full p-4 mb-2 mx-auto w-fit shadow-xl">
                        <FaSearchPlus className="w-8 h-8 text-wine" />
                      </div>
                      <span className="text-cream font-semibold text-lg block text-center">
                        Click para ver imagen completa
                      </span>
                      <span className="text-cream/80 text-sm block text-center mt-1">
                        Certificado oficial COEPRIS
                      </span>
                    </div>
                  </div>

                  {/* Badge flotante siempre visible */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-wine/20">
                      <FaExpand className="w-4 h-4 text-wine" />
                      <span className="text-xs font-medium text-wine">
                        Ver certificado
                      </span>
                    </div>
                  </div>

                  {/* Sello decorativo */}
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-blush rounded-full opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resto del contenido de la página */}
      <section className="container mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-wine">
            Fundamos Palmas Recovery en 2021 con una visión compartida:
            redefinir la experiencia postoperatoria.
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-olive-dark">
            <h4 className="text-2xl font-semibold text-wine">
              Con más de ocho años de experiencia en hospitalidad médica y una
              sólida colaboración con los mejores cirujanos plásticos de México,
              priorizamos tus inquietudes y objetivos postoperatorios.
            </h4>

            <p>
              Entendemos que la recuperación es más efectiva cuando se aborda de
              manera integral. Desde procedimientos expertos hasta cuidados
              personalizados, cada paso de nuestro proceso está diseñado con
              cuidado para garantizar tu bienestar.
            </p>

            <p>Tus necesidades están en el centro de todo lo que hacemos.</p>

            <div className="pt-10">
              <h3 className="text-3xl font-bold mb-4 text-wine">Misión</h3>
              <p className="text-xl font-semibold text-olive-dark">
                Nuestra misión es proporcionar un entorno eficiente, oportuno y
                acogedor que se sienta como un segundo hogar.
              </p>
              <h3 className="text-2xl font-semibold mt-8 text-wine">
                Nos comprometemos a ayudarte a lograr una recuperación óptima,
                asegurando que regreses a casa con tranquilidad.
              </h3>
            </div>

            <div className="pt-12">
              <h2 className="text-4xl font-bold mb-8 text-wine">
                Nuestros pilares
              </h2>

              <div className="space-y-10">
                <div className="border-l-4 border-sage pl-6">
                  <h3 className="text-2xl font-semibold text-wine">
                    Seguridad y acreditación:
                  </h3>
                  <h4 className="mt-2 text-lg text-olive-dark">
                    Tu salud es nuestra máxima prioridad. Aseguramos que todos
                    los cuidados estén respaldados por nuestra experiencia
                    profesional y las más altas acreditaciones médicas en
                    nuestro equipo.
                  </h4>
                </div>

                <div className="border-l-4 border-blush pl-6">
                  <h3 className="text-2xl font-semibold text-wine">
                    Apoyo experto:
                  </h3>
                  <h4 className="mt-2 text-lg text-olive-dark">
                    Brindamos orientación continua y experta a lo largo de tu
                    proceso de recuperación. No solo monitoreamos tu progreso;
                    navegamos activamente este camino contigo.
                  </h4>
                </div>

                <div className="border-l-4 border-olive-dark pl-6">
                  <h3 className="text-2xl font-semibold text-wine">
                    Flexibilidad y adaptabilidad:
                  </h3>
                  <h4 className="mt-2 text-lg text-olive-dark">
                    Comprendemos que el proceso de curación de cada persona es
                    único. Nuestros servicios son completamente adaptables, sin
                    estadía mínima ni máxima requerida, para satisfacer tus
                    necesidades individuales.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
