import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artículos y Guías de Recuperación | Palmas Recovery",
  description:
    "Consejos expertos sobre recuperación postquirúrgica, qué empacar, cuidados estacionales y por qué la atención profesional es fundamental. Guías para BBL, tummy tuck y más.",
  keywords: [
    "blog de recuperación",
    "consejos postoperatorios",
    "guía recuperación cirugía plástica",
    "consejos recuperación BBL",
    "artículos casa de recuperación Tijuana",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/",
      es: "https://www.palmasrecovery.com/articulos/",
    },
  },
};

export default function ArticulosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
