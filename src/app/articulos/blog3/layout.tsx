import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Casa de Recuperación vs Hotel: 3 Razones por las que el cuidado profesional es Crucial",
  description:
    "Tu espacio de recuperación es parte de tu tratamiento. No se trata solo de dónde dormirás. Descubre por qué una recuperación verdadera requiere experiencia médica y supervisión profesional.",
  keywords: ["Recuperación", "cuidado médico", "cuidado profesional"],
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
