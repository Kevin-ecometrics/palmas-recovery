import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Post-Op Recovery Stay | Palmas Recovery Tijuana",
  description:
    "Reserve your all-inclusive recovery package at Palmas Recovery. Choose your room, dates, and services. Transparent pricing, no hidden fees.",
  keywords: [
    "book recovery house Tijuana",
    "reserve post-op stay",
    "recovery package Tijuana",
    "BBL aftercare booking",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/book/",
    languages: {
      en: "https://www.palmasrecovery.com/book/",
      es: "https://www.palmasrecovery.com/reservar/",
    },
  },
};

export default function BookLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
