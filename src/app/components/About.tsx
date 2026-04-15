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
  const testimonials = t("about.testimonials", {
    returnObjects: true,
  }) as Array<{
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
    <div id="about">
      {/* Patient Stories Section - BLUSH */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wine">
              {t("about.patientStories.title")}
            </h2>
            <p className="text-lg text-wine/80">
              {t("about.patientStories.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-wine text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl group-hover:scale-105 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                  "{testimonial.story}"
                </p>

                <p className="font-bold text-lg text-wine text-center">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - WHITE */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wine">
            {t("about.cta.title")}
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
            {t("about.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() =>
                router.push(getLocalizedPath("/panorama", currentLang))
              }
              className="group bg-wine text-white px-10 py-4 rounded-xl font-bold hover:bg-wine/90 transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-3"
            >
              <FaCalendarAlt className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t("about.cta.schedule")}
            </button>
            <button
              onClick={() =>
                router.push(getLocalizedPath("/contact", currentLang))
              }
              className="group border-2 border-wine text-wine px-10 py-4 rounded-xl font-bold hover:bg-wine hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <FaPhone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t("about.cta.contact")}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section - BLUSH */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wine">
              {t("about.faq.title")}
            </h2>
            <p className="text-lg text-wine/80">{t("about.faq.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between group hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-bold text-wine pr-8 group-hover:text-wine/80 transition-colors">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    className={`w-5 h-5 md:w-6 md:h-6 text-wine transition-transform duration-300 flex-shrink-0 ${
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
