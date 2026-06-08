import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Casa de Recuperación en Tijuana para Cirujanos plástico",
  description:
    "¿Buscas una casa de recuperación certificada por COEPRIS? somos la extensión médica y logística ideal para el postoperatorio de tus pacientes. ",
  keywords: ["Recuperación", "cuidado médico", "cuidado profesional"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/blog5/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog5/",
      es: "https://www.palmasrecovery.com/articulos/blog5/",
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
