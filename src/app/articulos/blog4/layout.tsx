import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Cirugía Plástica en Tijuana | ¿Cómo elegir un Cirujano Plástico ",
  description:
    "Qué buscar en una clínica y cómo identificar a un cirujano plástico certificado para tu bienestar.Conoce que buscar en una casa de recuperación.",
  keywords: [ "Cirugía plástica"," cirugía plástica en Tijuana", "casa de recuperación"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/blog4/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog4/",
      es: "https://www.palmasrecovery.com/articulos/blog4/",
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
