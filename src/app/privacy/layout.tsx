import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Palmas Recovery",
  description: "Privacy policy for Palmas Recovery post-surgical care house in Tijuana, Mexico.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/privacy/",
    languages: {
      en: "https://www.palmasrecovery.com/privacy/",
      es: "https://www.palmasrecovery.com/privacidad/",
    },
  },
  robots: { index: false, follow: false },
};

export default function PrivacyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
