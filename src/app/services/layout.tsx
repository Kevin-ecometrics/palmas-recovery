import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post-Surgical Recovery Services | Palmas Recovery Tijuana",
  description:
    "Expert post-op care in Tijuana: 24/7 nursing, lymphatic drainage, pain management, private transport, and anti-inflammatory meal plans. All-inclusive packages.",
  keywords: [
    "recovery services Tijuana",
    "post-surgical care",
    "lymphatic drainage",
    "BBL recovery services",
    "post-op nursing Tijuana",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/services/",
    languages: {
      en: "https://www.palmasrecovery.com/services/",
      es: "https://www.palmasrecovery.com/servicios/",
    },
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
