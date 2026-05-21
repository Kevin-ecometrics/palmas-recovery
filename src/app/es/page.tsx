import type { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  title: "PALMAS RECOVERY - La mejor Casa de Recuperación en Tijuana",
  description:
    "Palmas Recovery: Cuidados 24/7 con enfermeras certificadas y médicos. Todo los servicios incluidos: Transporte, control de dolor, y plan nutricional.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/es/",
    languages: {
      en: "https://www.palmasrecovery.com/",
      es: "https://www.palmasrecovery.com/es/",
    },
  },
};

export default function Page() {
  return <HomePage />;
}
