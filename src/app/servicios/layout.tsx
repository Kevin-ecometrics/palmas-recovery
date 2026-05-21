import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Recuperación Post-Operatoria | Palmas Recovery Tijuana",
  description:
    "Cuidados postquirúrgicos en Tijuana: enfermeras 24/7, drenaje linfático, control del dolor, transporte privado y plan nutricional antiinflamatorio. Paquetes todo incluido.",
  keywords: [
    "servicios de recuperación Tijuana",
    "cuidados postoperatorios",
    "drenaje linfático",
    "recuperación BBL",
    "enfermeras postoperatorias Tijuana",
  ],
  alternates: {
    canonical: "https://www.palmasrecovery.com/servicios/",
    languages: {
      en: "https://www.palmasrecovery.com/services/",
      es: "https://www.palmasrecovery.com/servicios/",
    },
  },
};

export default function ServiciosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
