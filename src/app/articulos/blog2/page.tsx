import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";
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
      <Head>
        <title>
          ¿Cuál es el clima ideal para cirugía plástica y una recuperación
          óptima en Tijuana?
        </title>
        <meta
          name="description"
          content="Por qué el otoño es la temporada ideal para tu cirugía y recuperación. Descubre los beneficios de cada estación para tu procedimiento."
        />
        <link
          rel="canonical"
          href="https://www.palmasrecovery.com/es/clima-ideal-para-cirugia-plastica-y-recuperacion-en-tijuana"
        />
        <meta
          name="keywords"
          content="Recuperación, cirugía, temporada, clima, Tijuana, cirugía plástica, otoño, Palmas Recovery House"
        />
      </Head>

      <Navbar />

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

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
          ¿Cuál es el clima ideal para realizarte una cirugía plástica y tener
          una recuperación óptima en Tijuana?
        </h1>

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
        <div className="flex justify-between mt-12">
          <Link href="/articulos/blog1">Artículo anterior</Link>
          <Link href="/articulos/blog3">Siguiente artículo</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
