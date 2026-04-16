"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const IMAGES_TOP = [
  {
    src: "/mommy makeover/Visita nuestras redes sociales para mas contenido de Palmas Recovery.webp",
    alt: "Visita nuestras redes sociales para mas contenido sobre cuidados postquirúrgicos en Palmas Recovery ",
  },
  {
    src: "/mommy makeover/Conoce que hacer cada semana despues de tu mommy makeover con Palmas Recovery.webp",
    alt: "En Palmas recovery te damos toda la información que necesitas saber sobre tu recuperación semana tras semana ",
  },
  {
    src: "/mommy makeover/En palmas Recovery tu recuperacion es nuestra prioridad.webp",
    alt: "En Palmas tu recuperacion es esencial y sera proridad durante tu estadia  ",
  },
  {
    src: "/mommy makeover/En Palmas entendemos el proceso de recuperacion y te apoyamos en cada etapa.webp",
    alt: "En Palmas Recovery entendemos el proceso de recuperación y te acompanamos en cada momento para  ",
  },
  {
    src: "/mommy makeover/Recuperate sin preocupaciones de un mommy makeover en Palmas Recovery.webp",
    alt: "En palmas recovery nuestro equipo de doctores y enfermeras harán de tu recuperación de mommy makeover la mejor experiencia ",
  },
  {
    src: "/mommy makeover/Visita palmasrecovery en instagram para mas contenido y consejos.webp",
    alt: "Visita palmasrecovery en Instagram para mas consejos y recomendaciones postquirúrgicas  ",
  },
];

const IMAGES_BOTTOM = [
  {
    src: "/POST PALMAS RECOVERY SERVICES/La mejor recuperacion es con palmas recovery.webp",
    alt: "Visita las redes sociales de palmas para conocer la mejor casa de recuperacion Palmas Recovery ",
  },
  {
    src: "/POST PALMAS RECOVERY SERVICES/Palmas recovery tiene paquetes todo includo para tu cuidado.webp",
    alt: "Descubre los paquetes todo incluido de palmas recovery ",
  },
  {
    src: "/process for a BBL/Conoce todo sobre el proceso de recuperacion de un BBL con Palmas.webp",
    alt: "En Palmas Recovery te damos una guía fácil sobre que esperar en tu proceso de recuperación de un BBL  ",
  },
  {
    src: "/process for a BBL/Durante tu recuperacion tras un BBL es normal enfrenter alguna incomodidad por ello en palmas nos encargamos de todo para tu relajacion.webp",
    alt: "Durante tu recuperacion tras un BBL es normal enfrentar alguna incomodidad por ello en palmas nos encargamos de todo desde medicamentos, alimentación cuidados para que sea una recuperacion agradable y relajada ",
  },
  {
    src: "/process for a BBL/Una recuperacion y cuidados expertos son esenciales para tener el mejor resultado en tu BBL.webp",
    alt: "Es importante cuidados expertos de Palmas Recovery  durante tu primera semana post BBL para tener los mejores resultados ",
  },
  {
    src: "/process for a BBL/No te recuperes solo hazlo con supervision de expertos en Palmas Recovery.webp",
    alt: "En Palmas Recovery nuestros doctores y enfermeras cuidan de ti después de tu BBL ",
  },
  {
    src: "/process for a BBL/Es importante cuidados expertos de Palmas Recovery  durante tu primera semana post BBL.webp",
    alt: "EL Palmas recovery brindamos atención especializada para cirugias como BBL ",
  },
  {
    src: "/process for a BBL/En Palmas Recovery cuidados de ti en las primeras etapas despues de tu BBL.webp",
    alt: "En palmas Recovery te brindamos cuidados especializados con medicos certificados para los mejores resultados de tu BBL ",
  },
  {
    src: "/process for a BBL/En Palmas Recovery cuidados de ti despues de tu BBL.webp",
    alt: "No te recuperes solo hazlo con supervision de medicos expertos y enfermeras en Palmas Recovery ",
  },
];

const FALLBACK_IMAGE = "/Casa de recuperacion palmas recovery en Tijuana  .png";

function MarqueeRow({
  images,
  direction = "left",
  speed = 40,
}: {
  images: Array<{ src: string; alt: string }>;
  direction?: "left" | "right";
  speed?: number;
}) {
  const xStart = direction === "left" ? "0%" : "-50%";
  const xEnd = direction === "left" ? "-50%" : "0%";

  return (
    <div className="overflow-hidden w-full relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#faf9f7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#faf9f7] to-transparent" />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: [xStart, xEnd] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-[260px] h-[270px] flex-shrink-0 overflow-hidden group"
            style={{ borderRadius: "2px" }}
          >
            <img
              src={src.src}
              alt={src.alt}
              title={src.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
              loading="lazy"
              decoding="async"
              width={260}
              height={270}
              onError={(event) => {
                const target = event.currentTarget;
                if (target.src !== window.location.origin + FALLBACK_IMAGE) {
                  target.src = FALLBACK_IMAGE;
                }
              }}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteImageBanner() {
  const { t } = useTranslation();

  return (
    <section className="py-28 bg-[#faf9f7] overflow-hidden">
      <div className="flex flex-col gap-0">
        {/* TOP ROW */}
        <MarqueeRow images={IMAGES_TOP} direction="left" speed={40} />

        {/* CENTER CONTENT */}
        <div className="relative py-20 px-6 md:px-8 text-center">
          {/* Decorative thin line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-stone-300" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-6 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Gallery
            </p>

            <h2
              className="text-[2.6rem] leading-[1.1] text-stone-800 mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
              }}
            >
              {t("infiniteBanner.title1")}
            </h2>

            <p
              className="text-[2.6rem] leading-[1.1] text-stone-500 mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              {t("infiniteBanner.title2")}
            </p>

            <a
              href="https://www.instagram.com/palmasrecovery/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("infiniteBanner.ctaAria")}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase font-medium text-stone-800 border border-stone-300 hover:border-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "1px",
              }}
            >
              <FaInstagram size={13} />
              @palmasrecovery
            </a>
          </motion.div>

          {/* Decorative thin line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-stone-300" />
        </div>

        {/* BOTTOM ROW — reversed direction */}
        <MarqueeRow images={IMAGES_BOTTOM} direction="right" speed={50} />
      </div>
    </section>
  );
}
