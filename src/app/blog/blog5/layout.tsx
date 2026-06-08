import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Recovery House in Tijuana for Plastic Surgeons | Palmas Recovery",
  description:
    "Are you a plastic surgeon looking for a COEPRIS-certified recovery house in Tijuana? Palmas Recovery is the medical and logistical extension of your practice.",
  keywords: ["Recovery house Tijuana", "plastic surgeon alliance", "COEPRIS certified", "post-op care Tijuana"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/blog5/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog5/",
      es: "https://www.palmasrecovery.com/articulos/blog5/",
    },
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
