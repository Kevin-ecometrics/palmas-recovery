import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaArrowLeft,
  FaSun,
  FaWind,
  FaThermometerHalf,
  FaCheckCircle,
} from "react-icons/fa";
import Link from "next/link";

export default function Blog2() {
  return (
<>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img src="/Viaja con el mejor clima y agenda tu hospedaje para una recuperacion postoperatoria de primer nivel en tijuana en pr.jpg" alt="Descubre el mejor clima para viajar y recupérate en la mejor casa de recuperación en Tijuana Palmas Recovery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            ¿Cuál es el clima ideal para realizarte una cirugía plástica y tener
            una recuperación óptima en Tijuana?
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="mb-8">
          <Link
            href="/es/blog"
            className="inline-flex items-center gap-2 text-[#70805a] hover:text-[#5f6f4a] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Volver a todos los artículos
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-[#70805a] mt-8 mb-4">
          El momento perfecto: por qué la temporada importa en tu cirugía
        </h2>

        <p className="text-lg text-gray-700 mb-8">
          Tijuana se ha consolidado como un destino líder en turismo médico y
          cirugía estética. Sin embargo, hay un factor que muchos pacientes
          pasan por alto:
          <span className="font-semibold text-[#70805a]"> el clima</span>.
          <br />
          Elegir la temporada adecuada no solo mejora tu experiencia de viaje,
          sino que también optimiza tu proceso de recuperación.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          ¿Por qué el clima influye en la recuperación?
        </h3>

        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Reduce el riesgo de inflamación e infecciones.</li>
          <li>
            Favorece una mejor cicatrización al mantener el cuerpo fresco.
          </li>
          <li>Brinda mayor comodidad durante los días más sensibles.</li>
        </ul>

        <p className="mb-8">
          Aunque no existe una fecha perfecta para todos, tu cirujano evaluará
          tu caso para elegir el mejor momento. En
          <span className="font-semibold text-[#70805a]"> Palmas Recovery</span>
          , priorizamos tu seguridad y bienestar.
        </p>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-4">
          ¿Por qué el otoño es la mejor temporada?
        </h2>

        <p className="mb-8">
          Los especialistas consideran el{" "}
          <span className="font-semibold text-[#8a9a6a]">otoño</span> como la
          mejor época para procedimientos estéticos:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#f2e9dc] rounded-xl p-6 text-center shadow">
            <FaThermometerHalf className="text-3xl text-[#70805a] mb-2 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Menos inflamación</h3>
            <p className="text-gray-700">
              Las temperaturas moderadas reducen la sudoración y evitan
              irritaciones en heridas y vendajes.
            </p>
          </div>

          <div className="bg-[#f2e9dc] rounded-xl p-6 text-center shadow">
            <FaSun className="text-3xl text-[#8a9a6a] mb-2 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Menor radiación UV</h3>
            <p className="text-gray-700">
              Disminuye el riesgo de manchas o hiperpigmentación en cicatrices.
            </p>
          </div>

          <div className="bg-[#f2e9dc] rounded-xl p-6 text-center shadow">
            <FaWind className="text-3xl text-[#70805a] mb-2 mx-auto" />
            <h3 className="font-bold text-lg mb-2">Mayor comodidad</h3>
            <p className="text-gray-700">
              Las prendas de compresión son más cómodas en climas frescos.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-4">
          Beneficios según el procedimiento
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-[#8a9a6a] mb-2">
              Cirugía de busto
            </h3>
            <p className="text-gray-700">
              El clima fresco facilita el uso del brasier postoperatorio y
              reduce molestias.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#8a9a6a] mb-2">
              Remodelación corporal
            </h3>
            <p className="text-gray-700">
              Permite usar fajas de manera constante, clave para lograr
              resultados óptimos.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#8a9a6a] mb-2">
              Rejuvenecimiento facial
            </h3>
            <p className="text-gray-700">
              Protege la piel sensible y reduce la exposición al sol.
            </p>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-16 mb-6">
          ¿Por qué elegir Palmas Recovery?
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Sin importar la temporada, ofrecemos un entorno ideal para tu
          recuperación, trabajando en conjunto con tu cirujano.
        </p>
        <div className="my-12 mx-auto max-w-4xl">
					<div className="relative overflow-hidden rounded-2xl shadow-2xl">
						<img src="/Cuidados especiales post mommy makeover con enfermeras certificas todos los meses del año en palmas recovery.webp" alt="Cuidados especializados por médicos y enfermeras para mommy makeover, bbl y más solo en Palmas recovery abierto todos los meses del año" className="w-full h-auto" />
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
							<p className="text-white text-sm font-medium">Cuidados especializados por médicos y enfermeras para mommy makeover, bbl y más solo en Palmas recovery abierto todos los meses del año</p>
						</div>
					</div>
				</div>
        <h2 className="text-2xl font-bold text-[#70805a] mt-10 mb-4">
          Incluye:
        </h2>

        <ul className="list-disc pl-6 mb-8 text-gray-700">
          <li>
            <strong>Atención 24/7:</strong> Médicos y enfermería.
          </li>
          <li>
            <strong>Ambiente controlado:</strong> Aire acondicionado en todas
            las áreas.
          </li>
          <li>
            <strong>Comodidad hospitalaria:</strong> Camas médicas, WiFi y
            entretenimiento.
          </li>
          <li>
            <strong>Terapias:</strong> Masajes linfáticos.
          </li>
          <li>
            <strong>Nutrición:</strong> Alimentación especializada.
          </li>
          <li>
            <strong>Flexibilidad:</strong> Sin estancia mínima.
          </li>
        </ul>

        <div className="bg-[#f2e9dc] rounded-xl p-8 text-center shadow mb-12">
          <FaCheckCircle className="text-4xl text-[#70805a] mb-4 mx-auto" />
          <h3 className="text-2xl font-bold text-[#70805a] mb-2">
            ¿Listo para comenzar?
          </h3>
          <p className="text-gray-700 mb-4">
            Reserva hoy y deja que nosotros nos encarguemos de todo.
          </p>
          <Link
            href="/reservar"
            className="px-8 py-3 bg-[#70805a] text-white rounded-full"
          >
            Reservar ahora
          </Link>
        </div>

        {/* Navegación */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <Link
                href="/articulos/blog1"
                className="group inline-flex items-center gap-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#70805a] group-hover:bg-[#70805a]/10 transition">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Artículo anterior</p>
                  <p className="font-semibold">Qué empacar para tu recuperación</p>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link
                href="/articulos/blog3"
                className="group inline-flex items-center gap-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm text-gray-500">Siguiente artículo</p>
                  <p className="font-semibold">Casa de Recuperación vs. Hotel</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#70805a] group-hover:bg-[#70805a]/10 transition rotate-180">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/articulos"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors border border-[#70805a] rounded-full hover:bg-[#70805a]/5"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Volver a todos los artículos
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
