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
  FaStethoscope,
  FaHeartbeat,
} from "react-icons/fa";
import Link from "next/link";

export default function Blog4() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img
          src="/images blog 4/Cirugia plastica en Tijuana con expertos.webp"
          alt="Cirugía plástica en Tijuana con expertos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            ¿Estás considerando una cirugía plástica? Descubre por qué Tijuana es el destino ideal y cómo elegir al especialista correcto
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="mb-8">
          <Link
            href="/articulos"
            className="inline-flex items-center gap-2 text-[#70805a] hover:text-[#5f6f4a] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Volver a todos los artículos
          </Link>
        </div>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-4">
          ¿Es la ciudad de Tijuana un buen lugar para la cirugía plástica?
        </h4>

        <p className="text-lg text-gray-700 mb-6">
          Si eres un paciente extranjero o local, elegir Tijuana para realizarte una cirugía plástica es una de las decisiones más confiables que puedes tomar. La ciudad es reconocida a nivel mundial como la meca del turismo médico, ya que alberga a los mejores especialistas y cirujanos plásticos de México.
        </p>

        <p className="text-gray-700 mb-4">Tijuana destaca a nivel nacional e internacional por su alto enfoque y excelencia en procedimientos como:</p>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
          <li>Liposucción y contorno corporal.</li>
          <li>Abdominoplastia (tummy tuck).</li>
          <li>Mommy makeover.</li>
          <li>Levantamiento de glúteos.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          Ventajas de tu cirugía plástica en Tijuana
        </h2>

        <p className="text-gray-700 mb-8">
          Para los pacientes que viajan desde Estados Unidos o Canadá, la ubicación geográfica es inigualable. La ciudad ofrece una conectividad excelente gracias a su cercanía estratégica con el Aeropuerto Internacional de Tijuana y el Aeropuerto Internacional de Los Ángeles (LAX), facilitando un traslado cómodo y directo.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Cómo elegir un buen cirujano plástico y una clínica segura en Tijuana
        </h3>

        <p className="text-gray-700 mb-6">
          Como profesionales de la salud, consideramos fundamental hablar con total transparencia sobre lo que muchas clínicas o personas omiten. En algunos casos, la mala praxis de personas no calificadas ha generado complicaciones y noticias desafortunadas. Esto es completamente normal que cause miedo o incertidumbre, haciendo que muchos pacientes duden en continuar con su proceso.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">Para que recuperes la tranquilidad, te compartimos los puntos clave para blindar tu salud y tu inversión:</p>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-4">Investiga a tu especialista</h4>

        <p className="text-gray-700 mb-4">La preparación de un cirujano plástico certificado en México es sumamente rigurosa y obligatoria:</p>

        <div className="space-y-4 mb-8">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaStethoscope className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Cirugía General</p>
                <p className="text-gray-700">Requiere acreditar al menos 2 años de especialización previa en cirugía general, realizando un mínimo de 150 cirugías anuales en hospitales públicos y privados acreditados por la Secretaría de Salud.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaUserMd className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Cirugía Plástica y Reconstructiva</p>
                <p className="text-gray-700">Posteriormente, deben cursar un posgrado obligatorio de 4 años.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Certificación Oficial</p>
                <p className="text-gray-700">Al finalizar, el médico debe aprobar un estricto examen de certificación administrado por el Consejo Mexicano de Cirugía Plástica, Estética y Reconstructiva (CMCPER).</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          ¿Cómo evitar fraudes y poner en riesgo tu vida para elegir un cirujano plástico en Tijuana?
        </h3>

        <p className="text-gray-700 mb-4">
          Queremos hacer un énfasis muy especial en esto: un médico general con una maestría en estética <span className="font-semibold text-[#70805a]">NO</span> tiene el entrenamiento formal ni la autorización para operar en ningún hospital público o privado.
        </p>

        <div className="bg-[#70805a]/10 border-l-4 border-[#70805a] rounded-r-xl p-6 mb-8">
          <p className="text-gray-800">
            <span className="font-bold text-[#70805a]">Consejo vital:</span> Asegúrate de verificar la cédula profesional de medicina general y la cédula de especialidad en cirugía plástica del médico. Esta información debe estar visible en su consultorio, redes sociales o ser entregada de inmediato si la solicitas.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          ¿Por qué no acudir con un "esteticista" con maestría para tu cirugía plástica en Tijuana?
        </h2>

        <p className="text-gray-700 mb-4">
          Si ocurre una complicación en el quirófano, un médico sin la especialidad oficial no tiene las credenciales y preparación para salvarle la vida.
        </p>

        <p className="text-gray-700 mb-6">
          Asimismo, si las instalaciones no cuentan con permisos visibles o accesibles al público, lo más probable es que se trate de clínicas clandestinas no autorizadas por la COFEPRIS (o la COEPRIS a nivel estado).
        </p>

        <p className="text-gray-700 mb-8">
          La clave para elegir al especialista correcto no radica en qué tan "bonita" sea la clínica, sino en la alta capacitación del doctor, la preparación de su equipo ante cualquier emergencia y el uso de instalaciones de primer nivel que funcionen con los estrictos protocolos de seguridad de un quirófano hospitalario.
        </p>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images blog 4/Liposuccion y contorno corporal   tummy tuck Mommy makeover con expertos en Tijuana.webp"
              alt="Liposucción y contorno corporal, tummy tuck y mommy makeover con expertos en Tijuana"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">Liposucción y contorno corporal, tummy tuck y mommy makeover con expertos en Tijuana</p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-6">
          En Palmas Recovery, trabajamos exclusivamente con cirujanos plásticos certificados.
        </h4>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-4 mb-4">
          ¿Qué esperar durante el proceso de consulta?
        </h3>

        <p className="text-gray-700 mb-4">
          Tu cirujano y su equipo clínico deben transmitirte seguridad y total transparencia desde el primer contacto. Un trato humano implica responder cada una de tus dudas con respeto y claridad, por más mínima que parezca.
        </p>

        <p className="text-gray-700 mb-8">
          Durante esta etapa, el manejo de tu recuperación es clave. El médico te orientará y podrá sugerirte una casa de recuperación. Es indispensable que el lugar elegido cuente con todos los permisos sanitarios vigentes y esté supervisado por médicos y enfermeras certificadas, no por personal auxiliar. Una vez aclarados todos los detalles y acordada la fecha de la cirugía, lo habitual es que pases una estancia inicial en el hospital para monitorear que tu evolución inmediata sea perfecta.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Hablemos de costos y paquetes de una cirugía plástica en Tijuana
        </h3>

        <p className="text-gray-700 mb-4">
          La mayoría de los cirujanos plásticos ofrecen paquetes "todo incluido". Al contratar un esquema que ya sume la casa de recuperación, asegúrate de que esta cumpla estrictamente con los protocolos de higiene, salud y monitoreo experto.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">Un paquete completo y seguro usualmente incluye:</p>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
          <li>Servicios postoperatorios esenciales (como drenajes linfáticos).</li>
          <li>Visitas de seguimiento con el cirujano.</li>
          <li>Traslados y recolección entre el aeropuerto, la clínica y la casa de recuperación.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          ¿Es necesario quedarse en una casa de recuperación después de una cirugía plástica?
        </h2>

        <p className="text-gray-700 mb-6">
          Tu procedimiento quirúrgico no termina al salir del quirófano; concluye con éxito una vez que recibes el alta definitiva.
        </p>

        <p className="text-gray-700 mb-4">Durante tu estancia en Palmas Recovery, te ofrecemos paquetes todo incluido diseñados minuciosamente para garantizar tu bienestar integral y mitigar los riesgos más comunes de la siguiente manera:</p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Infecciones</p>
                <p className="text-gray-700">Realizamos un monitoreo diario y curaciones bajo estrictas normas higiénicas.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHeartbeat className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Dolor</p>
                <p className="text-gray-700">Médicos y enfermeras en casa administran y controlan tu medicación de forma continua para que tu progreso sea cómodo.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Ansiedad</p>
                <p className="text-gray-700">Contamos con un equipo médico y de enfermería dispuesto a escucharte y apoyarte las 24 horas. Además, puedes reservar tu estancia con un acompañante, recibir visitas diarias de familiares o amigos, y elegir entre habitaciones privadas o compartidas para fomentar un ambiente de comunidad y acompañamiento.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaUserMd className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Complicaciones</p>
                <p className="text-gray-700">Logramos una detección temprana y mantenemos una acción y comunicación rápida con tu cirujano plástico.</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-2">
          Porque el postoperatorio es el verdadero secreto del éxito
        </h4>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-4 mb-4">
          El 60% de los resultados finales de tu cirugía dependen de los cuidados postoperatorios.
        </h3>

        <p className="text-gray-700 mb-6">
          Procedimientos como la liposucción, el tummy tuck, el aumento o reducción de busto y el facelift requieren de curaciones precisas, asistencia para la movilidad y un seguimiento clínico minucioso para evitar complicaciones graves como trombosis, fibrosis o infecciones.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">Nuestros servicios en Palmas Recovery incluyen:</p>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
          <li>Habitaciones equipadas con camas hospitalarias.</li>
          <li>Servicio de lavandería especializado y lavado de fajas compresivas.</li>
          <li>Enfermeras disponibles las 24 horas del día.</li>
          <li>Alimentación antiinflamatoria rica en proteínas (para regenerar tejidos más rápido) y alta en fibra (para ayudar a tu cuerpo a eliminar la anestesia).</li>
          <li>Coordinación directa con tu cirujano plástico desde el primer día.</li>
          <li>Transporte privado para todas tus consultas de seguimiento.</li>
          <li>Masajes y drenajes linfáticos para reducir la retención de líquidos, disminuir la inflamación y optimizar la circulación.</li>
        </ul>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images blog 4/Instalaciones de primer nivel en las zonas mas seguras de tijuana para tu postoperatorio.webp"
              alt="Instalaciones de primer nivel en las zonas más seguras de Tijuana para tu postoperatorio"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">Instalaciones de primer nivel en las zonas más seguras de Tijuana para tu postoperatorio</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f2e9dc] rounded-xl p-8 flex flex-col items-center text-center shadow mb-12">
          <FaCheckCircle className="text-4xl text-[#70805a] mb-4" />
          <h3 className="text-2xl font-bold text-[#70805a] mb-2">
            Pon tu salud en manos expertas
          </h3>
          <p className="text-gray-700 mb-4">Realiza tu cirugía con cirujanos plásticos certificados y vive tu postoperatorio con médicos certificados y especialistas en el cuidado.</p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-3 bg-[#70805a] text-white font-bold rounded-full shadow hover:bg-[#5f6f4a] transition"
          >
            Contáctanos
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <Link href="/articulos/cual-es-el-clima-ideal-para-cirugia-plastica-y-recuperacion-en-tijuana" className="text-[#70805a]">
              ← Artículo anterior
            </Link>
            <Link href="/articulos/eres-cirujano-plastico-y-buscas-una-casa-de-recuperacion-de-primer-nivel-en-tijuana" className="text-[#70805a]">
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
