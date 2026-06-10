import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "¿El clima ideal para cirugía plástica y una recuperación sin complicaciones en Tijuana?",
  description:
    "Por qué el otoño es la temporada dorada para tu cirugía y cuidado postoperatorio. En este blog, analizamos a fondo los beneficios estacionales para cada procedimiento.",
  keywords: [
    "Recuperación",
    "procedimientos",
    "temporada",
    "curación",
    "Tijuana",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/cual-es-el-clima-ideal-para-cirugia-plastica-y-recuperacion-en-tijuana/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/the-ideal-weather-for-plastic-surgery-and-smooth-recovery-in-tijuana/",
      es: "https://www.palmasrecovery.com/articulos/cual-es-el-clima-ideal-para-cirugia-plastica-y-recuperacion-en-tijuana/",
    },
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
