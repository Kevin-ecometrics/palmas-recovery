import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery House vs hotel: 3 Reasons professional care is Crucial ",
  description:
    "Your recovery space is part of your treatment. It’s not just about where you’ll sleep.Discover why true recovery requires medical expertise and supervision.",
  keywords: ["Recovery", "medical care", "professional care"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/recovery-house-vs-hotel-3-reasons-professional-care-is-crucial/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/recovery-house-vs-hotel-3-reasons-professional-care-is-crucial/",
      es: "https://www.palmasrecovery.com/articulos/casa-de-recuperacion-vs-hotel-3-razones-por-las-que-el-cuidado-profesional-es-crucial/",
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
