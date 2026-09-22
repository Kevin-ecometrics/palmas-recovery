import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Palmas Recovery",
  description:
    "Cancellation, change and shortened-stay policy of Palmas Recovery, post-surgical recovery house in Tijuana, Mexico.",
  alternates: {
    canonical: "https://www.palmasrecovery.com/cancellation-policy/",
    languages: {
      en: "https://www.palmasrecovery.com/cancellation-policy/",
      es: "https://www.palmasrecovery.com/politica-cancelacion/",
    },
  },
  robots: { index: false, follow: false },
};

export default function CancellationPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
