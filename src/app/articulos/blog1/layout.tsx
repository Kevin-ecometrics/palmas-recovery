import { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Qué empacar para tu casa de recuperación postoperatoria en Tijuana?",
  description:
    "¿Te hospedarás en una casa de recuperación después de tu cirugía plástica? Te proporcionamos los elementos esenciales para garantizar un viaje sin estrés para ti y tu acompañante.",
  keywords: ["Recuperación", "Tijuana", "viaje", "viajando"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/articulos/blog1/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog1/",
      es: "https://www.palmasrecovery.com/articulos/blog1/",
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
