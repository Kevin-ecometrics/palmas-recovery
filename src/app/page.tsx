import type { Metadata } from "next";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "Palmas Recovery Tijuana | 24/7 Nursing & In-House Doctors",
  description:
    "10 mins from the border. Expert pain management, private transport, lymphatic drainage & anti-inflammatory meals designed for optimal recovery.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/",
    languages: {
      en: "https://www.palmasrecovery.com/",
      es: "https://www.palmasrecovery.com/es/",
    },
  },
};

export default function Page() {
  return <HomePage />;
}
