import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery Blog | Post-Op Tips & Guides | Palmas Recovery",
  description:
    "Expert advice on post-surgical recovery, what to pack, seasonal tips, and why professional care matters. Read our guides for BBL, tummy tuck, and more.",
  keywords: [
    "recovery blog",
    "post-op tips",
    "plastic surgery recovery guide",
    "BBL recovery tips",
    "Tijuana recovery house blog",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/",
      es: "https://www.palmasrecovery.com/articulos/",
    },
  },
};

export default function BlogIndexLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
