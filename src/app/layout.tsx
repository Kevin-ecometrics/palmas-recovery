import { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import "./globals.css";
import I18nProvider from "../i18n/I18nProvider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Palmas Recovery Tijuana | 24/7 Nursing & In-House Doctors",
  description:
    "10 mins from the border. Expert pain management, private transport, lymphatic drainage & anti-inflammatory meals designed for optimal recovery.",
  keywords: [
    "Casa de recuperación en Tijuana",
    "Surgery aftercare Tijuana",
    "post-op recovery home Mexico",
    "Casa de recuperación",
    "BBL recovery house Tijuana",
    "Mommy Makeover aftercare",
    "tummy tuck recovery home",
    "Affordable recovery house Tijuana",
    "All-inclusive surgery recovery packages",
    "Safe post-op housing Mexico",
    "Best recovery home in Tijuana",
    "Certified recovery house Tijuana",
    "Recovery house with lymphatic massage",
    "Post-op meal plans Tijuana",
  ],
};

const META_PIXEL_ID = "743057892204187";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');`}
          </Script>
        )}
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <GoogleTagManager gtmId="GTM-MN5745N8" />
        <GoogleAnalytics gaId="G-NG4JKZ5NRL" />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
