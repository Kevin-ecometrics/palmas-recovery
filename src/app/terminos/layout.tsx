import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Palmas Recovery",
  description: "Términos y condiciones de Palmas Recovery, casa de recuperación postquirúrgica en Tijuana, México.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/terminos/",
    languages: {
      en: "https://www.palmasrecovery.com/terms/",
      es: "https://www.palmasrecovery.com/terminos/",
    },
  },
  robots: { index: false, follow: false },
};

export default function TerminosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
