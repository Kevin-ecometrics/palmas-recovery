import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva tu Estadía de Recuperación | Palmas Recovery Tijuana",
  description:
    "Reserva tu paquete de recuperación todo incluido en Palmas Recovery. Selecciona tu habitación, fechas y servicios. Precios transparentes, sin costos ocultos.",
  keywords: [
    "reservar casa de recuperación Tijuana",
    "reserva estancia postoperatoria",
    "paquete de recuperación Tijuana",
    "recuperación BBL reservar",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/reservar/",
    languages: {
      en: "https://www.palmasrecovery.com/book/",
      es: "https://www.palmasrecovery.com/reservar/",
    },
  },
};

export default function ReservarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
