import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The ideal weather for plastic surgery & smooth recovery in Tijuana? ",
  description:
    "Why autumn is the golden season for your surgery and post-op care. In this blog, we provide an in-depth look at the seasonal benefits for each procedure.",
  keywords: ["Recovery", "procedures", "season", "healing", "tijuana"],
  alternates: {
    canonical: "https://www.palmasrecovery.com/blog/the-ideal-weather-for-plastic-surgery-and-smooth-recovery-in-tijuana/",
    languages: {
      en: "https://www.palmasrecovery.com/blog/the-ideal-weather-for-plastic-surgery-and-smooth-recovery-in-tijuana/",
      es: "https://www.palmasrecovery.com/articulos/cual-es-el-clima-ideal-para-cirugia-plastica-y-recuperacion-en-tijuana/",
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
