import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Recovery House in Tijuana for Plastic Surgeons | Palmas Recovery",
  description:
    "Are you a plastic surgeon looking for a COEPRIS-certified recovery house in Tijuana? Palmas Recovery is the medical and logistical extension of your practice.",
  keywords: ["Recovery house Tijuana", "plastic surgeon alliance", "COEPRIS certified", "post-op care Tijuana"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/are-you-a-plastic-surgeon-looking-for-a-premier-recovery-house-in-tijuana/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/are-you-a-plastic-surgeon-looking-for-a-premier-recovery-house-in-tijuana/",
      es: "https://www.palmasrecovery.com/articulos/eres-cirujano-plastico-y-buscas-una-casa-de-recuperacion-de-primer-nivel-en-tijuana/",
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
