import { Montserrat } from "next/font/google";
import "./globals.css";
import I18nProvider from "../i18n/I18nProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav.ico" type="image/x-icon" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
