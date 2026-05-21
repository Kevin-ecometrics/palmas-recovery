import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery Rooms & Accommodations | Palmas Recovery Tijuana",
  description:
    "Choose from private, shared, or VIP recovery rooms at Palmas Recovery Tijuana. All rooms include medical supervision, meals, and full amenities.",
  keywords: [
    "recovery rooms Tijuana",
    "private recovery suite",
    "VIP recovery room",
    "post-op accommodations Mexico",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/rooms/",
    languages: {
      en: "https://www.palmasrecovery.com/rooms/",
      es: "https://www.palmasrecovery.com/habitaciones/",
    },
  },
};

export default function RoomsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
