"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";

export default function PrivateRoomPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const highlights = t("tour.private.highlights", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;
  const features = t("tour.private.features", { returnObjects: true }) as string[];
  const faq = t("tour.private.faq", { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-principal via-principal/90 to-olive-dark text-white">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-28 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/90 font-semibold tracking-widest text-xs uppercase mb-5">
              {t("tour.private.heroLabel")}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
              {t("tour.private.title")}
              <span className="block text-cream">{t("tour.private.subtitle")}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              {t("tour.private.description")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={getLocalizedPath("/book", currentLang)}
                className="bg-white text-principal px-8 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-cream transition-all shadow-lg text-center"
              >
                {t("tour.private.book")}
              </Link>
              <Link
                href={getLocalizedPath("/contact", currentLang)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-white hover:text-principal transition-all text-center"
              >
                {t("tour.private.ask")}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="/private-room.jpg"
                alt="Private recovery room"
                className="w-full h-[360px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-cream/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-principal font-semibold tracking-widest text-xs uppercase mb-4">
              {t("tour.private.highlightsLabel")}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900">
              {t("tour.private.highlightsTitle")}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              {t("tour.private.highlightsSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-cream"
              >
                <div className="w-10 h-10 rounded-full bg-principal/10 text-principal flex items-center justify-center font-bold mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-principal font-semibold tracking-widest text-xs uppercase mb-3">
                {t("tour.private.detailsLabel")}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                {t("tour.private.detailsTitle")}
              </h2>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {t("tour.private.detailsText")}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-2 w-2 h-2 bg-principal rounded-full"></div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={getLocalizedPath("/book", currentLang)}
                className="bg-principal text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-principal/90 transition-all text-center"
              >
                {t("tour.private.reserve")}
              </Link>
              <Link
                href={getLocalizedPath("/rooms", currentLang)}
                className="border-2 border-principal text-principal px-8 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-principal hover:text-white transition-all text-center"
              >
                {t("tour.private.viewAll")}
              </Link>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/shared-room.jpg"
                alt="Room ambiance"
                className="w-full h-56 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/vip-suite.jpeg"
                alt="Private suite details"
                className="w-full h-56 md:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-cream/60 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900">
              {t("tour.private.faqTitle")}
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              {t("tour.private.faqSubtitle")}
            </p>
          </div>

          <div className="grid gap-6">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-cream"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-principal text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            {t("tour.private.ctaTitle")}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            {t("tour.private.ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={getLocalizedPath("/book", currentLang)}
              className="bg-white text-principal px-8 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-cream transition-all shadow-lg text-center"
            >
              {t("tour.private.ctaBook")}
            </Link>
            <Link
              href={getLocalizedPath("/contact", currentLang)}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-white hover:text-principal transition-all text-center"
            >
              {t("tour.private.ctaTalk")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
