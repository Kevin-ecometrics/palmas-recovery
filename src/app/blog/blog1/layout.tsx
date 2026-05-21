import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What to pack for your post-op recovery house in Tijuana ? ",
  description:
    "Staying at a recovery house after your plastic surgery? We provide you with the must-haves to ensure a stress-free trip for you and your companion. ",
  keywords: ["Recovery", "Tijuana", "travel", "traveling"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/blog1/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog1/",
      es: "https://www.palmasrecovery.com/articulos/blog1/",
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
