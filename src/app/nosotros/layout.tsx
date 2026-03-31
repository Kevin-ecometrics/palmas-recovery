import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nosotros - Conoce a Palmas Recovery, el hogar de recuperación post-operatoria líder en Tijuana.",
  description:
    "En Palmas, tus necesidades son lo más importante en todo lo que hacemos. Disfruta de un proceso postoperatorio cuidadosamente diseñado para garantizar tu comodidad y seguridad desde 2021.",
  keywords: [
    "postoperatorio",
    "recuperación",
    "hogar",
    "proceso de recuperación",
  ],
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
