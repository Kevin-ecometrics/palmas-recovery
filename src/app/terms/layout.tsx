import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Palmas Recovery",
  description: "Terms and conditions for Palmas Recovery post-surgical care house in Tijuana, Mexico.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/terms/",
    languages: {
      en: "https://www.palmasrecovery.com/terms/",
      es: "https://www.palmasrecovery.com/terminos/",
    },
  },
  robots: { index: false, follow: false },
};

export default function TermsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
