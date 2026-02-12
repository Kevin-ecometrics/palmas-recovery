import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { 
  FaCalendarAlt,
  FaSun,
  FaStar,
  FaCheckCircle,
  FaArrowLeft,
  FaCalendarCheck,
  FaTemperatureLow,
  FaUmbrella,
  FaLeaf
} from "react-icons/fa";
import Link from "next/link";

const bestSeasons = [
  {
    icon: <FaSun className="text-2xl" />,
    title: "Temporada Óptima",
    period: "Noviembre - Abril",
    description: "La mejor época para tu recuperación",
    features: [
      "Clima perfecto para cicatrización (16-24°C)",
      "Baja humedad - menor riesgo de infección",
      "Ideal para actividades al aire libre",
      "Mayor disponibilidad de cirujanos expertos"
    ],
    recommendation: "Altamente recomendado",
    color: "text-[#657251]",
    bgColor: "bg-gradient-to-br from-[#657251]/20 to-[#657251]/5",
    borderColor: "border-[#657251]/30"
  }
];

const keyBenefits = [
  {
    icon: <FaTemperatureLow className="text-2xl" />,
    title: "Temperaturas Perfectas",
    description: "16-24°C - Ideal para recuperación post-operatoria"
  },
  {
    icon: <FaUmbrella className="text-2xl" />,
    title: "Pocas Lluvias",
    description: "Humedad baja para mejor cicatrización de heridas"
  },
  {
    icon: <FaLeaf className="text-2xl" />,
    title: "Cicatrización Óptima",
    description: "Condiciones climáticas ideales para sanación"
  },
  {
    icon: <FaCalendarCheck className="text-2xl" />,
    title: "Planificación Garantizada",
    description: "Disponibilidad de los mejores especialistas"
  }
];

const planningTips = [
  {
    title: "Reserva con anticipación",
    description: "4-6 meses antes para asegurar tu fecha preferida"
  },
  {
    title: "Consulta médica previa",
    description: "Coordinación con tu cirujano para mejores resultados"
  },
  {
    title: "Considera la recuperación",
    description: "Planifica 7-14 días de estadía en Tijuana"
  },
  {
    title: "Prepara documentos",
    description: "Pasaporte, historial médico y presupuesto"
  }
];

export default function Blog2() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#657251]/10 via-white to-[#657251]/5 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#657251]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#657251]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Botón Back to All Articles alineado a la izquierda */}
          <div className="relative pl-6 mb-8">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full"></div>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#657251] hover:text-[#657251]/80 transition-colors group pl-3"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Volver a todos los artículos
            </Link>
          </div>
          
          <div className="text-center mb-8">
            {/* Título "Planning Guide" centrado */}
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-px bg-[#657251]"></div>
              <span className="text-[#657251] font-semibold tracking-wider uppercase text-sm">
                Guía Definitiva
              </span>
              <div className="w-12 h-px bg-[#657251]"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              La Mejor Época para<br />
              <span className="text-[#657251]">Cirugía Plástica en Tijuana</span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Descubre por qué <strong>Noviembre a Abril</strong> es el período ideal para tu recuperación post-operatoria en Tijuana, México.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-[#657251]/10 to-[#657251]/5 rounded-full">
            <FaStar className="text-yellow-500" />
            <span className="text-[#657251] font-bold">Respuesta definitiva</span>
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            La mejor temporada es: <span className="text-[#657251]">Noviembre a Abril</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Después de analizar el clima, la disponibilidad médica y miles de casos de recuperación, 
            podemos afirmar con certeza que <strong>la temporada seca de Tijuana (noviembre a abril)</strong> 
            ofrece las condiciones perfectas para tu cirugía plástica y recuperación.
          </p>
        </div>

        {/* Best Season Highlight */}
        <div className="mb-16">
          {bestSeasons.map((season, index) => (
            <div 
              key={index}
              className="relative rounded-3xl overflow-hidden border-2 border-[#657251]/30 bg-gradient-to-br from-white to-gray-50"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#657251]/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
              
              <div className="relative p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#657251]/20 to-[#657251]/10 border-2 border-[#657251]/30">
                      {season.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{season.title}</h3>
                      <p className="text-[#657251] font-bold text-lg">{season.period}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    {season.recommendation}
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <p className="text-gray-700 text-lg italic border-l-4 border-[#657251] pl-4 py-2">
                    {season.description}
                  </p>
                </div>
                
                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {season.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#657251]/30 transition-colors">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why This Season? */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              ¿Por qué elegir esta temporada?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estas son las razones clave que hacen de Noviembre-Abril el período ideal
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 hover:border-[#657251]/30 transition-all duration-300 hover:shadow-lg text-center"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#657251]/10 to-[#657251]/5 border border-[#657251]/20 text-[#657251] inline-flex mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Tips */}
        <div className="mb-12 bg-gradient-to-r from-[#657251]/10 to-white p-8 rounded-2xl border border-[#657251]/30">
          <div className="flex items-center gap-3 mb-8">
            <FaCalendarAlt className="text-2xl text-[#657251]" />
            <h3 className="text-2xl font-bold text-gray-900">
              Consejos para planificar tu cirugía
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {planningTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#657251]/20 to-[#657251]/10 flex items-center justify-center border border-[#657251]/30">
                  <span className="text-[#657251] font-bold">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{tip.title}</h4>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Advice */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 border border-blue-300">
                <FaCheckCircle className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Recomendación profesional
                </h3>
                <div className="text-gray-700 space-y-4">
                  <p>
                    <strong>Reserva con 4-6 meses de anticipación</strong> si planeas tu cirugía 
                    entre diciembre y marzo, cuando los cirujanos más solicitados tienen mayor demanda.
                  </p>
                  <p>
                    Aunque Tijuana ofrece condiciones favorables durante todo el año, 
                    <span className="font-bold text-[#657251]"> la temporada seca maximiza tu comodidad, 
                    seguridad y resultados</span> durante el crítico período de recuperación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mb-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#657251]/10 to-white border border-[#657251]/30">
            <h3 className="text-2xl font-bold text-gray-900">
              ¿Listo para programar tu cirugía?
            </h3>
            <p className="text-gray-600 max-w-xl">
              La temporada ideal te espera. Contacta a nuestros especialistas para 
              planificar tu procedimiento durante el período óptimo de recuperación.
            </p>
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-[#657251] to-[#8a9a5b] text-white font-bold rounded-full hover:shadow-lg transition-shadow">
              Contactar especialista
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link 
              href="/blog/blog1"
              className="inline-flex items-center gap-2 text-[#657251] hover:text-[#657251]/80 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Anterior: Qué empacar
            </Link>
          </div>
          
          <div className="text-right">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#657251] hover:text-[#657251]/80 transition-colors border border-[#657251] rounded-full hover:bg-[#657251]/5"
            >
              Volver al Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
}