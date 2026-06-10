import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Cirugía Plástica en Tijuana | ¿Cómo elegir un Cirujano Plástico ",
  description:
    "Qué buscar en una clínica y cómo identificar a un cirujano plástico certificado para tu bienestar.Conoce que buscar en una casa de recuperación.",
  keywords: [ "Cirugía plástica"," cirugía plástica en Tijuana", "casa de recuperación"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/por-que-tijuana-es-el-destino-ideal-para-cirugia-plastica-y-como-elegir-al-especialista-correcto/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/why-tijuana-is-the-ideal-destination-for-plastic-surgery-and-how-to-choose-the-right-specialist/",
      es: "https://www.palmasrecovery.com/articulos/por-que-tijuana-es-el-destino-ideal-para-cirugia-plastica-y-como-elegir-al-especialista-correcto/",
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
