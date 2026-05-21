import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Palmas Recovery | Book Your Stay in Tijuana",
  description:
    "Get in touch with Palmas Recovery. We're 10 minutes from the US border in Tijuana. Contact us to plan your post-surgical recovery stay.",
  keywords: [
    "contact Palmas Recovery",
    "book recovery house Tijuana",
    "post-op care contact",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/contact/",
    languages: {
      en: "https://www.palmasrecovery.com/contact/",
      es: "https://www.palmasrecovery.com/contacto/",
    },
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
