import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Palmas Recovery, Tijuana's premier post-surgical facility.",
  description:
    "At Palmas, your needs are at the core of everything we do. Experience a post-op process thoughtfully designed for your comfort and safety since 2021. ",
  keywords: ["post-operative", "recovery", "home", "recovery journey"],
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
