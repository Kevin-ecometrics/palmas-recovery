import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Casa de Recuperación en Tijuana para Cirujanos plástico",
  description:
    "¿Buscas una casa de recuperación certificada por COEPRIS? somos la extensión médica y logística ideal para el postoperatorio de tus pacientes. ",
  keywords: ["Recuperación", "cuidado médico", "cuidado profesional"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/eres-cirujano-plastico-y-buscas-una-casa-de-recuperacion-de-primer-nivel-en-tijuana/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/are-you-a-plastic-surgeon-looking-for-a-premier-recovery-house-in-tijuana/",
      es: "https://www.palmasrecovery.com/articulos/eres-cirujano-plastico-y-buscas-una-casa-de-recuperacion-de-primer-nivel-en-tijuana/",
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
