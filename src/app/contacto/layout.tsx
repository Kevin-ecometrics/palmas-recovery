import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Reserva tu Estancia | Palmas Recovery Tijuana",
  description:
    "Contáctanos para planear tu recuperación postoperatoria. Estamos a 10 minutos de la frontera en Tijuana. Escríbenos para conocer nuestros paquetes.",
  keywords: [
    "contacto Palmas Recovery",
    "reservar casa de recuperación Tijuana",
    "cuidados postoperatorios contacto",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/contacto/",
    languages: {
      en: "https://www.palmasrecovery.com/contact/",
      es: "https://www.palmasrecovery.com/contacto/",
    },
  },
};

export default function ContactoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
