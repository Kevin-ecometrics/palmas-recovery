"use client";

import { useState } from "react";
import { FaStar, FaCalendarAlt, FaPhone, FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";
export default function ImprovedSections() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const testimonials = t("about.testimonials", { returnObjects: true }) as Array<{
    name: string;
    story: string;
    rating: number;
    procedure: string;
    avatar: string;
  }>;

  const faqs = t("about.faq.items", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <div className="bg-white">
      {/* Patient Stories Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-principal  bg-clip-text">
              {t("about.patientStories.title")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("about.patientStories.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-5xl bg-principal text-white rounded-full w-16 h-16 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg inline-block">
                  <span className="text-sm font-semibold text-principal">
                    {testimonial.procedure}
                  </span>
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                  "{testimonial.story}"
                </p>

                <p className="font-bold text-lg text-hover">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-principal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {t("about.cta.title")}
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-95">
            {t("about.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() =>
                router.push(getLocalizedPath("/panorama", currentLang))
              }
              className="group bg-white text-principal px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <FaCalendarAlt className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t("about.cta.schedule")}
            </button>
            <button
              onClick={() =>
                router.push(getLocalizedPath("/contact", currentLang))
              }
              className="group border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-principal transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <FaPhone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t("about.cta.contact")}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-principal">
              {t("about.faq.title")}
            </h2>
            <p className="text-xl text-gray-600">{t("about.faq.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between group hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 pr-8 group-hover:text-principal transition-colors">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    className={`w-5 h-5 md:w-6 md:h-6 text-principal transition-transform duration-300 flex-shrink-0 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedFaq === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
