import { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Qué empacar para tu casa de recuperación postoperatoria en Tijuana?",
  description:
    "¿Te hospedarás en una casa de recuperación después de tu cirugía plástica? Te proporcionamos los elementos esenciales para garantizar un viaje sin estrés para ti y tu acompañante.",
  keywords: ["Recuperación", "Tijuana", "viaje", "viajando"],
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
