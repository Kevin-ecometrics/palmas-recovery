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

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const router = useRouter();
  const coreServices = [
    {
      icon: <FaHeartbeat />,
      title: "24/7 Medical Supervision",
      description:
        "Round-the-clock professional care ensures your comfort and safety during recovery.",
      details: [
        "Licensed nursing staff on-site 24 hours",
        "Vital signs monitoring",
        "Immediate emergency response",
        "Direct coordination with your surgeon",
      ],
    },
    {
      icon: <FaUserMd />,
      title: "Personalized Care Plans",
      description:
        "Every guest receives a recovery plan tailored by our experienced healthcare team.",
      details: [
        "Custom recovery timeline",
        "Medication management",
        "Progress tracking & documentation",
        "Regular health assessments",
      ],
    },
    {
      icon: <FaConciergeBell />,
      title: "Luxury Accommodations",
      description:
        "Experience a serene, hotel-style environment that promotes healing and relaxation.",
      details: [
        "Private & shared room options",
        "Premium bedding & linens",
        "Climate-controlled comfort",
        "Entertainment systems",
      ],
    },
    {
      icon: <FaUtensils />,
      title: "Gourmet Meal Service",
      description:
        "Enjoy nutritious, chef-prepared meals designed to aid your post-surgical recovery.",
      details: [
        "Doctor-approved nutrition plans",
        "Fresh, locally-sourced ingredients",
        "Accommodates dietary restrictions",
        "Three meals + snacks daily",
      ],
    },
    {
      icon: <FaSpa />,
      title: "Wellness & Comfort",
      description:
        "Holistic approach to recovery including relaxation and gentle therapeutic activities.",
      details: [
        "Comfortable common areas",
        "Outdoor garden access",
        "Entertainment options",
        "Quiet relaxation spaces",
      ],
    },
    {
      icon: <FaPills />,
      title: "Medication Management",
      description:
        "Professional administration and monitoring of all prescribed medications.",
      details: [
        "Timely medication delivery",
        "Side effect monitoring",
        "Pharmacy coordination",
        "Detailed medication logs",
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaAward />,
      stat: "500+",
      label: "Successful Recoveries",
    },
    {
      icon: <FaShieldAlt />,
      stat: "100%",
      label: "Licensed Medical Staff",
    },
    {
      icon: <FaBed />,
      stat: "24/7",
      label: "Care & Support",
    },
    {
      icon: <FaCheckCircle />,
      stat: "5★",
      label: "Patient Satisfaction",
    },
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
            Premium Post-Surgical Care
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Your Recovery,
            <br />
            Our Priority
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            At Palmas Recovery, we blend medical excellence with luxury
            hospitality to create the perfect environment for your healing
            journey.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-y border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="inline-block text-principal text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {item.icon}
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
              Comprehensive Care Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every aspect of your recovery is carefully managed by our
              dedicated team of healthcare professionals.
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
                    {service.icon}
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
                    {activeService === index ? "Show Less" : "Learn More"}
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
              Our Commitment to Excellence
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Driven by purpose, guided by compassion, dedicated to your
              recovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FaHeartbeat className="text-3xl" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Our Mission</h3>
              </div>
              <p className="text-white/95 text-lg leading-relaxed">
                Provide the best post-surgical recovery service in a timely,
                efficient, and warm manner, ensuring a healthy return to your
                daily life with the highest standards of medical care and
                personal attention.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FaAward className="text-3xl" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Our Vision</h3>
              </div>
              <p className="text-white/95 text-lg leading-relaxed">
                To be Tijuana's most trusted post-surgical recovery spa,
                recognized internationally for excellence in service,
                state-of-the-art facilities, and compassionate care that
                transforms the recovery experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Ready to Begin Your Recovery?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the difference that professional care and luxury comfort
            make in your post-surgical journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/book")}
              className="bg-principal text-white px-10 py-4 rounded-lg font-bold hover:bg-principal/90 transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="border-2 border-principal text-principal px-10 py-4 rounded-lg font-bold hover:bg-principal hover:text-white transition-all text-lg"
            >
              Contact Us
            </button>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            Questions? Call us at{" "}
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
