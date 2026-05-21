import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Palmas Recovery",
  description: "Política de privacidad de Palmas Recovery, casa de recuperación postquirúrgica en Tijuana, México.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/privacidad/",
    languages: {
      en: "https://www.palmasrecovery.com/privacy/",
      es: "https://www.palmasrecovery.com/privacidad/",
    },
  },
  robots: { index: false, follow: false },
};

export default function PrivacidadLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
