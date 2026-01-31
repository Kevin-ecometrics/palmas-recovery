"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaHeartbeat,
  FaUserMd,
  FaConciergeBell,
  FaUtensils,
  FaSpa,
  FaShieldAlt,
  FaPills,
  FaBed,
  FaCheckCircle,
  FaAward,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/i18n/routeMap";

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const coreServices = t("services.core", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    details: string[];
  }>;
  const serviceIcons = [
    <FaHeartbeat key="heart" />,
    <FaUserMd key="doctor" />,
    <FaConciergeBell key="concierge" />,
    <FaUtensils key="meals" />,
    <FaSpa key="spa" />,
    <FaPills key="pills" />,
  ];
  const whyChooseUs = t("services.stats", { returnObjects: true }) as Array<{
    stat: string;
    label: string;
  }>;
  const statIcons = [
    <FaAward key="award" />,
    <FaShieldAlt key="shield" />,
    <FaBed key="bed" />,
    <FaCheckCircle key="check" />,
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-principal via-principal to-principal/90 text-white py-24 px-6 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-white/90 font-semibold tracking-widest text-sm mb-6 uppercase animate-fade-in">
            {t("services.heroLabel")}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            {t("services.heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t("services.heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-y border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="inline-block text-principal text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {statIcons[index]}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-principal mb-1">
                {item.stat}
              </div>
              <div className="text-gray-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Services Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t("services.sectionTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("services.sectionSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <div
                key={index}
                onClick={() =>
                  setActiveService(activeService === index ? null : index)
                }
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group border-2 border-transparent hover:border-principal"
              >
                <div className="p-8">
                  <div className="text-principal text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {serviceIcons[index]}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-principal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Expandable Details */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeService === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-200 space-y-2">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <FaCheckCircle className="text-principal mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="mt-4 text-principal font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    {activeService === index
                      ? t("common.showLess")
                      : t("common.learnMore")}
                    <span
                      className={`transform transition-transform ${
                        activeService === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision - Redesigned */}
      <div className="py-20 px-6 bg-principal text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {t("services.commitmentTitle")}
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {t("services.commitmentSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FaHeartbeat className="text-3xl" />
                </div>
                <h3 className="text-3xl font-serif font-bold">
                  {t("services.missionTitle")}
                </h3>
              </div>
              <p className="text-white/95 text-lg leading-relaxed">
                {t("services.missionText")}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FaAward className="text-3xl" />
                </div>
                <h3 className="text-3xl font-serif font-bold">
                  {t("services.visionTitle")}
                </h3>
              </div>
              <p className="text-white/95 text-lg leading-relaxed">
                {t("services.visionText")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            {t("services.ctaTitle")}
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("services.ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push(getLocalizedPath("/book", currentLang))}
              className="bg-principal text-white px-10 py-4 rounded-lg font-bold hover:bg-principal/90 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("services.ctaBook")}
            </button>
            <button
              onClick={() =>
                router.push(getLocalizedPath("/contact", currentLang))
              }
              className="border-2 border-principal text-principal px-10 py-4 rounded-lg font-bold hover:bg-principal hover:text-white transition-all text-lg"
            >
              {t("services.ctaContact")}
            </button>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            {t("services.ctaQuestions")} {" "}
            <a href="tel:16199679558" className="text-principal font-semibold">
              +1 619-967-9558
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
