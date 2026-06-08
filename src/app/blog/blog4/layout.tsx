import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Plastic Surgery in Tijuana | How to Choose a Board-Certified Plastic Surgeon",
  description:
    "Considering plastic surgery in Tijuana? Learn what to look for in a certified plastic surgeon, how to avoid fraud, and why post-op care at a recovery house matters.",
  keywords: ["Plastic surgery Tijuana", "board-certified plastic surgeon", "recovery house Tijuana", "plastic surgery Mexico"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/blog4/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/blog4/",
      es: "https://www.palmasrecovery.com/articulos/blog4/",
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
