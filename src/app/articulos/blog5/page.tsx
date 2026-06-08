import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaArrowLeft,
  FaUserMd,
  FaShieldAlt,
  FaBed,
  FaCheckCircle,
  FaHospital,
  FaSpa,
  FaMapMarkerAlt,
  FaCertificate,
  FaHandshake,
} from "react-icons/fa";
import Link from "next/link";

export default function Blog5() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img
          src="/imagenes blog 5/Palmas recovery es tu equipo con una casa de recuperación de primer nivel en Tijuana.webp"
          alt="Palmas Recovery es tu equipo con una casa de recuperación de primer nivel en Tijuana"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            ¿Eres cirujano plástico y buscas extender la excelencia de tu equipo con una casa de recuperación de primer nivel en Tijuana?
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#70805a] hover:text-[#5f6f4a] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Volver a todos los artículos
          </Link>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          En el ámbito de la cirugía plástica, sabemos que un resultado extraordinario no culmina al cerrar la última sutura; el{" "}
          <span className="font-semibold text-[#70805a]">60% del éxito radica en un postoperatorio impecable</span>. En Palmas Recovery nos convertimos en la extensión médica, humana y logística de tu práctica profesional.
        </p>

        <p className="text-gray-700 mb-8">
          Somos una casa de recuperación creada y dirigida por médicos, atendida por un equipo de enfermeras certificadas, cuya misión es brindar excelencia en cuidados postoperatorios. Funcionamos bajo el rigor de un entorno clínico con monitoreo experto las 24 horas del día, los 7 días de la semana, pero ofreciendo la privacidad, el lujo y la tranquilidad de un espacio diseñado exclusivamente para el descanso y la sanación de tus pacientes.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Palmas Recovery House tiene una de las mejores ubicaciones: En el corazón médico de la ciudad
        </h3>

        <p className="text-gray-700 mb-4">Si estás buscando una alianza que optimice tu logística y brinde comodidad absoluta, nos encontramos en el punto más estratégico de la región:</p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Ubicación</p>
                <p className="text-gray-700">En el corazón de Zona Río, a unos pasos de los principales hospitales y clínicas quirúrgicas de Tijuana.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Conectividad</p>
                <p className="text-gray-700">A solo 10 minutos del cruce fronterizo internacional.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaSpa className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Entorno</p>
                <p className="text-gray-700">Situados en un área céntrica, rodeada de los mejores hoteles y centros comerciales, lo que garantiza la seguridad, accesibilidad y confort tanto de tus pacientes como de sus acompañantes.</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Palmas Recovery House tiene Certificación COEPRIS y apego estricto a las Metas Internacionales de Seguridad del Paciente
        </h3>

        <p className="text-gray-700 mb-6">
          Somos una institución completamente regulada, con permisos y aprobación vigentes por parte de la COEPRIS. Garantizamos un control sanitario estricto y operamos bajo protocolos internacionales de seguridad.
        </p>

        <p className="text-gray-700 mb-4">
          Entendemos la Seguridad del Paciente como el conjunto de acciones estructuradas para prevenir y reducir los riesgos. Por ello, adaptamos de manera estricta las Metas Internacionales de Seguridad del Paciente (establecidas por la OMS) en nuestro modelo de cuidado diario:
        </p>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/imagenes blog 5/Los doctores estan siempre atentos para respaldar tus resultados.webp"
              alt="Los doctores están siempre atentos para respaldar tus resultados"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">Los doctores están siempre atentos para respaldar tus resultados</p>
            </div>
          </div>
        </div>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-4">
          <li>
            <span className="font-semibold text-[#70805a]">Identificación correcta del paciente:</span> Procesos inequívocos de registro para evitar cualquier error de identidad en la atención.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Mejora de la comunicación efectiva:</span> Transmisión exacta de tus indicaciones postoperatorias. Eliminamos el uso de abreviaturas, indicaciones verbales sin respaldo o ambigüedades en las dosis escritas.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Seguridad en el manejo de medicamentos de alto riesgo:</span> Gestión, almacenamiento, control y administración sumamente estricta de analgésicos, anticoagulantes y fármacos postoperatorios para mitigar cualquier probabilidad de error.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Garantía de procedimientos correctos:</span> Aseguramos un seguimiento milimétrico y personalizado alineado estrictamente con el plan de recuperación que tú diseñaste para el paciente.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Reducción del riesgo de Infecciones Asociadas a la Atención de la Salud (IAAS):</span> Implementamos una cultura estricta de higiene de manos (agua, jabón y gel alcoholado) antes y después de cada interacción, junto con un riguroso manejo de esterilización y control de Residuos Peligrosos Biológico-Infecciosos (RPBI).
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Reducción del riesgo de daño por causa de caídas:</span> Nuestras instalaciones cuentan con infraestructura adaptada, barandales de seguridad en posiciones correctas, contención física preventiva si el estado del paciente lo requiere y asistencia constante del personal.
          </li>
        </ul>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-4">
          En Palmas Recovery House protegemos tu reputación ante la informalidad del mercado
        </h4>

        <p className="text-gray-700 mb-4">
          Ante el acelerado crecimiento del turismo médico en Tijuana, han proliferado cientos de casas de recuperación informales y "hoteles o residencias adaptadas" que operan sin regulaciones adecuadas, sin personal del sector salud de cabecera que tengan la preparación ante una eventualidad.
        </p>

        <p className="text-gray-700 mb-8">
          La falta de protocolos en el manejo del dolor, la ausencia de control de desechos biomédicos y la carencia de áreas esterilizadas suelen detonar infecciones, problemas de cicatrización o seromas, poniendo en riesgo la integridad de los pacientes con procedimientos invasivos. Esto no solo afecta la salud del paciente, sino que <span className="font-semibold text-[#70805a]">compromete directamente la reputación del cirujano plástico</span> y del sector médico de nuestra región.
        </p>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          El respaldo de la experiencia: La historia de Palmas Recovery
        </h2>

        <p className="text-gray-700 mb-4">
          Palmas Recovery nació en 2021 con el objetivo de trasladar los estándares de un hospital a un modelo de atención boutique y personalizada. Sus fundadores, el Dr. Raúl y la Dra. Cecilia, cuentan con más de 11 años de experiencia clínica atendiendo a cientos de pacientes bariátricos y de cirugía plástica dentro de diversos hospitales de prestigio en la ciudad.
        </p>

        <p className="text-gray-700 mb-6">
          Hoy en día, Palmas Recovery ha evolucionado a un espacio con instalaciones más amplias y un robusto equipo de profesionales de la salud que rotan 24/7 para asistir de manera meticulosa tanto a pacientes locales como internacionales.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">Nuestra infraestructura y servicios premium incluyen:</p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Instalaciones adaptadas</p>
                <p className="text-gray-700">Amplios pasillos de diseño hospitalario, rampas de acceso, elevador y baños perfectamente acondicionados para la movilidad postquirúrgica.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaBed className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Habitaciones clínicas</p>
                <p className="text-gray-700">Camas hospitalarias y áreas equipadas con aire acondicionado.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaUserMd className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Monitoreo especializado</p>
                <p className="text-gray-700">Revisión continua de signos vitales, así como limpieza y evaluación diaria de heridas.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Nutrición dirigida</p>
                <p className="text-gray-700">Dieta especializada con enfoque antiinflamatorio, alta en proteínas y fibra para favorecer la regeneración de tejidos y la eliminación de la anestesia.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaSpa className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Logística in-house</p>
                <p className="text-gray-700">Masajes y drenajes linfáticos terapéuticos realizados en nuestras instalaciones, servicio de lavandería y lavado especializado de fajas compresivas.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Traslado médico</p>
                <p className="text-gray-700">Transporte privado y seguro hacia tus consultas de seguimiento postoperatorio.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHandshake className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Trato humano y familiar</p>
                <p className="text-gray-700">Hospedaje acondicionado para un (1) acompañante por paciente y políticas flexibles de visitas para familiares. Creemos firmemente que un espacio transparente brinda paz mental a la familia y la certeza de que su ser querido está en las mejores manos.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/imagenes blog 5/Instalaciones de primer nivel para la recuperacion de tus pacientes.webp"
              alt="Instalaciones de primer nivel para la recuperación de tus pacientes"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">Instalaciones de primer nivel para la recuperación de tus pacientes</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f2e9dc] rounded-xl p-8 flex flex-col items-center text-center shadow mb-12">
          <FaCheckCircle className="text-4xl text-[#70805a] mb-4" />
          <h4 className="text-2xl font-bold text-[#70805a] mb-4">
            Formemos el equipo médico y logístico ideal en Tijuana
          </h4>
          <p className="text-gray-700 mb-4">
            Trabajamos con los mejores médicos especialistas, protegiendo en todo momento la integridad del gremio y brindando un blindaje de seguridad a tu práctica médica.
          </p>
          <p className="text-gray-700 mb-6">
            Permítenos cuidar de tus pacientes con la misma pasión, rigor y profesionalismo con el que tú los operas. Haz de Palmas Recovery el aliado estratégico de tu éxito quirúrgico.
          </p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-3 bg-[#70805a] text-white font-bold rounded-full shadow hover:bg-[#5f6f4a] transition"
          >
            Contáctanos
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <Link href="/articulos/blog4" className="text-[#70805a]">
              ← Artículo anterior
            </Link>
            <Link href="/articulos/blog1" className="text-[#70805a]">
              Siguiente artículo →
            </Link>
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
