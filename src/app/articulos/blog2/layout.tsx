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
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
