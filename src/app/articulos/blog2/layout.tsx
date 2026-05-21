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
    canonical: "https://www.palmasrecovery.com/articulos/blog2/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog2/",
      es: "https://www.palmasrecovery.com/articulos/blog2/",
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
