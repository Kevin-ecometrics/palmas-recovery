import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Habitaciones y Alojamiento | Palmas Recovery Tijuana",
  description:
    "Elige entre habitaciones privadas, compartidas o VIP en Palmas Recovery Tijuana. Todas incluyen supervisión médica, alimentación y amenidades completas.",
  keywords: [
    "habitaciones de recuperación Tijuana",
    "suite privada recuperación",
    "habitación VIP recuperación",
    "alojamiento postoperatorio México",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/habitaciones/",
    languages: {
      en: "https://www.palmasrecovery.com/rooms/",
      es: "https://www.palmasrecovery.com/habitaciones/",
    },
  },
};

export default function HabitacionesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
