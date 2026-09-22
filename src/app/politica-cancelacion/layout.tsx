import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cancelación | Palmas Recovery",
  description:
    "Reglamento de cancelaciones, cambios y reducción de estadía de Palmas Recovery, casa de recuperación postquirúrgica en Tijuana, México.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/politica-cancelacion/",
    languages: {
      en: "https://www.palmasrecovery.com/cancellation-policy/",
      es: "https://www.palmasrecovery.com/politica-cancelacion/",
    },
  },
  robots: { index: false, follow: false },
};

export default function PoliticaCancelacionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
