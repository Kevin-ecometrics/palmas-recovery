"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as Array<{
    title: string;
    content?: string;
    list?: string[];
  }>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="bg-gradient-to-b from-white via-[#fffaf6] to-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="text-center mb-14">
            <p className="text-principal font-semibold tracking-widest text-xs uppercase mb-4">
              {t("common.legal")}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t("privacy.title")}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("privacy.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <details
                key={section.title}
                className={`group border rounded-xl ${
                  index === sections.length - 1
                    ? "border-principal/30 bg-principal/10"
                    : "border-gray-200 bg-white/70"
                }`}
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-gray-900 font-semibold">
                  {section.title}
                  <span className="text-gray-400 transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                  {section.list ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
