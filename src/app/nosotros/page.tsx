import React from "react";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Fundamos Palmas Recovery en 2021 con una visión compartida:
            redefinir la experiencia postoperatoria.
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <h4 className="text-2xl font-semibold">
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
              <h3 className="text-3xl font-bold mb-4">Misión</h3>
              <p className="text-xl font-semibold">
                Nuestra misión es proporcionar un entorno eficiente, oportuno y
                acogedor que se sienta como un segundo hogar.
              </p>
              <h3 className="text-2xl font-semibold mt-8">
                Nos comprometemos a ayudarte a lograr una recuperación óptima,
                asegurando que regreses a casa con tranquilidad.
              </h3>
            </div>

            <div className="pt-12">
              <h2 className="text-4xl font-bold mb-8">Nuestros pilares</h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-semibold">
                    Seguridad y acreditación:
                  </h3>
                  <h4 className="mt-2 text-lg text-gray-700">
                    Tu salud es nuestra máxima prioridad. Aseguramos que todos
                    los cuidados estén respaldados por nuestra experiencia
                    profesional y las más altas acreditaciones médicas en
                    nuestro equipo.
                  </h4>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">Apoyo experto:</h3>
                  <h4 className="mt-2 text-lg text-gray-700">
                    Brindamos orientación continua y experta a lo largo de tu
                    proceso de recuperación. No solo monitoreamos tu progreso;
                    navegamos activamente este camino contigo.
                  </h4>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Flexibilidad y adaptabilidad:
                  </h3>
                  <h4 className="mt-2 text-lg text-gray-700">
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
