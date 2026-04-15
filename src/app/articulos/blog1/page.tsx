import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaSuitcase,
  FaTshirt,
  FaTooth,
  FaFileMedical,
  FaTape,
  FaBook,
  FaChargingStation,
  FaPills,
  FaArrowLeft,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { GiWaterBottle } from "react-icons/gi";
import Link from "next/link";

export default function Blog1() {
  const packingItems = [
    {
      icon: <FaTshirt className="text-2xl" />,
      title: "Ropa cómoda y holgada",
      description:
        "Fácil de poner y quitar, preferiblemente con botones o cierres al frente.",
    },
    {
      icon: <FaTooth className="text-2xl" />,
      title: "Artículos de higiene personal",
      description:
        "Cepillo de dientes, pasta, toallitas faciales, shampoo en seco, desodorante y jabón suave.",
    },
    {
      icon: <FaFileMedical className="text-2xl" />,
      title: "Documentos médicos",
      description: "Indicaciones de cirugía, recetas médicas e identificación.",
    },
    {
      icon: <FaTape className="text-2xl" />,
      title: "Prendas de compresión",
      description: "Según las recomendaciones de tu cirujano.",
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Entretenimiento",
      description:
        "Libros, revistas, audífonos o tablet para ver películas y escuchar música.",
    },
    {
      icon: <GiWaterBottle className="text-2xl" />,
      title: "Snacks y botella de agua",
      description:
        "Snacks saludables y una botella reutilizable para mantenerte hidratado.",
    },
    {
      icon: <FaChargingStation className="text-2xl" />,
      title: "Cargadores",
      description: "Para tu teléfono y otros dispositivos electrónicos.",
    },
    {
      icon: <FaPills className="text-2xl" />,
      title: "Almohadas",
      description: "Para mayor comodidad y soporte durante la recuperación.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img
          src="/Viaja a tijuana para tu cirugia plastica y recupera en palmas recovery.webp"
          alt="Viaja a Tijuana para tu cirugía plástica y recupérate en Palmas Recovery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            ¿Qué empacar para tu casa de recuperación postoperatoria?
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="mb-8">
          <Link
            href="/es/blog"
            className="inline-flex items-center gap-2 text-[#657251] hover:text-[#657251]/80 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Volver a todos los artículos
          </Link>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Viajar para un procedimiento quirúrgico es un compromiso importante
          con tu salud y tus objetivos estéticos. En Palmas Recovery House,
          entendemos que una recuperación exitosa comienza mucho antes de llegar
          a Tijuana.
        </p>

        <p className="text-lg text-gray-700 mb-8">
          Para asegurar una transición sin estrés del quirófano a nuestro
          cuidado, en este blog te compartimos los elementos esenciales que
          debes llevar para un viaje tranquilo a Tijuana.
        </p>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          Investiga tu destino
        </h3>

        <p className="mb-6">
          Familiarízate con la zona donde se realizará tu cirugía. Investiga
          alojamientos cercanos, restaurantes y opciones de transporte,
          especialmente si viajas con un acompañante que quiera conocer la
          ciudad. En Palmas Recovery House, ofrecemos recomendaciones
          personalizadas para una experiencia más cómoda.
        </p>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          I. Documentación y logística esencial
        </h3>

        <ul className="list-disc pl-6 mb-6">
          <li>
            Identificación: Pasaporte válido e identificación oficial. Verifica
            si necesitas visa para ingresar a México.
          </li>
          <li>
            Historial médico: Copias físicas o digitales de consultas, historial
            médico y contactos de emergencia.
          </li>
          <li>
            Seguro y contactos: Documentos de seguro de viaje (especialmente
            cobertura médica) y datos de contacto del cirujano y hospital.
          </li>
          <li>
            Preparación financiera: Lleva moneda local para gastos pequeños e
            informa a tu banco sobre tu viaje para evitar bloqueos.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          II. Ropa funcional postoperatoria
        </h3>

        <ul className="list-disc pl-6 mb-6">
          <li>
            Ropa de apertura frontal: Pijamas o batas con botones o cierres.
            Evita ropa que se coloque por la cabeza.
          </li>
          <li>
            Protección de la piel: Prendas de algodón suaves para evitar
            irritación con fajas médicas.
          </li>
          <li>
            Calzado seguro: Zapatos o pantuflas antideslizantes y fáciles de
            poner.
          </li>
          <li>
            Soporte circulatorio: Medias de compresión para reducir inflamación
            y mejorar circulación.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          III. Higiene personal y autocuidado
        </h3>

        <ul className="list-disc pl-6 mb-6">
          <li>
            Productos de viaje: Shampoo, acondicionador y limpiadores suaves.
          </li>
          <li>Hidratación: Bálsamo labial o hidratante.</li>
          <li>Cuidado fácil: Shampoo en seco y toallitas faciales.</li>
        </ul>

        <p className="mb-8">
          Muchos de estos productos se pueden comprar en Tijuana si prefieres
          viajar ligero. Sin embargo, puedes llevar todo preparado para mayor
          tranquilidad.
        </p>
        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/Lo que no te puede faltar para tu recuperacion en palmas recovery house bbl1.webp"
              alt="Trae tus básicos para una recuperación de primer nivel en Palmas Recovery House o cómpralos fácil en nuestra página web"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">
                Trae tus básicos para una recuperación de primer nivel en Palmas
                Recovery House o cómpralos fácil en nuestra página web
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6">
          Descubre por qué PALMAS RECOVERY es tu mejor opción
        </h2>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          IV. Instalaciones y experiencia del paciente
        </h3>

        <p className="mb-6">
          Nuestras instalaciones combinan excelencia clínica con comodidad
          residencial. Nuestro personal de enfermería te asistirá desde tu
          llegada.
        </p>

        <h2 className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6">
          Lo que nos distingue:
        </h2>

        <ul className="list-disc pl-6 mb-6">
          <li>
            Supervisión médica: Evaluación por especialistas tras tu llegada.
          </li>
          <li>
            Nutrición especializada: Dieta antiinflamatoria para acelerar
            recuperación.
          </li>
          <li>Conectividad: Wi-Fi de alta velocidad y Smart TVs.</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          V. Acompañantes y experiencia en Tijuana
        </h3>

        <p className="mb-6">
          Tijuana es una ciudad vibrante con múltiples actividades. Mientras te
          recuperas, tu acompañante puede disfrutar de:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>Cultura: CECUT y Avenida Revolución.</li>
          <li>Gastronomía: Cocina mexicana, internacional y vinos locales.</li>
          <li>Ocio: Centros comerciales, golf y fútbol.</li>
        </ul>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-12 mb-6">
          ¿Cuánto tiempo debes quedarte antes de volar?
        </h1>

        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">
          VI. Seguridad en el viaje de regreso
        </h3>

        <p className="mb-8">
          Recomendamos entre 7 y 14 días antes de volar. Viajar antes puede
          implicar riesgos como trombosis o inflamación. Coordinamos con tu
          cirujano para determinar el mejor momento.
        </p>

        <p className="mb-8">
          ¿Listo para comenzar? En Palmas Recovery combinamos atención médica
          profesional con calidez humana.
        </p>

        {/* Navegación */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <Link
                href="/articulos/blog3"
                className="group inline-flex items-center gap-3 text-[#657251] hover:text-[#657251]/80 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#657251] group-hover:bg-[#657251]/10 transition">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Artículo anterior</p>
                  <p className="font-semibold">
                    Casa de Recuperación vs. Hotel
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link
                href="/articulos/blog2"
                className="group inline-flex items-center gap-3 text-[#657251] hover:text-[#657251]/80 transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm text-gray-500">Siguiente artículo</p>
                  <p className="font-semibold">Clima ideal para cirugía</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#657251] group-hover:bg-[#657251]/10 transition rotate-180">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/articulos"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#657251] hover:text-[#657251]/80 transition-colors border border-[#657251] rounded-full hover:bg-[#657251]/5"
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
