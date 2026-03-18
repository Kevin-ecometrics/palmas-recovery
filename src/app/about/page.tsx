"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import {
  FaShieldAlt,
  FaAward,
  FaCheckCircle,
  FaTimes,
  FaSearchPlus,
  FaExpand,
} from "react-icons/fa";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Modal for full image */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-cream transition-colors z-10"
          >
            <FaTimes className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src="/coepris.png"
              alt="COEPRIS Certification"
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <section className="bg-white py-32">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-cream/20">
            <img
              src="/logo.png"
              alt="Palmas Recovery Logo"
              className=" object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* COEPRIS Accreditation Section */}
      <section className="bg-gradient-to-br from-cream to-blush/20 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sage/20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text content */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <FaShieldAlt className="w-6 h-6 text-wine" />
                    <span className="text-sm font-semibold text-wine uppercase tracking-wider">
                      Official Accreditation
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-wine mb-4">
                    Endorsed by COEPRIS
                  </h3>

                  <p className="text-olive-dark/80 mb-6">
                    We are certified by the State Commission for Protection
                    against Sanitary Risks, guaranteeing that our facilities and
                    procedures meet the highest standards of quality and
                    sanitary safety.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="w-5 h-5 text-sage" />
                      <span className="text-sm text-olive-dark">
                        Valid certification
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaAward className="w-5 h-5 text-wine" />
                      <span className="text-sm text-olive-dark">
                        High quality standards
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image container with interactive message */}
                <div
                  className="relative h-64 md:h-80 bg-gradient-to-br from-wine to-olive-dark flex items-center justify-center p-8 group cursor-pointer overflow-hidden"
                  onClick={() => setModalOpen(true)}
                >
                  {/* Decorative frame */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cream"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-cream"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-cream"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cream"></div>
                  </div>

                  {/* Image with zoom effect */}
                  <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <img
                      src="/coepris.png"
                      alt="COEPRIS Certification"
                      className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  {/* Hover message */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-cream rounded-full p-4 mb-2 mx-auto w-fit shadow-xl">
                        <FaSearchPlus className="w-8 h-8 text-wine" />
                      </div>
                      <span className="text-cream font-semibold text-lg block text-center">
                        Click to view full image
                      </span>
                      <span className="text-cream/80 text-sm block text-center mt-1">
                        Official COEPRIS certificate
                      </span>
                    </div>
                  </div>

                  {/* Always visible badge */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-wine/20">
                      <FaExpand className="w-4 h-4 text-wine" />
                      <span className="text-xs font-medium text-wine">
                        View certificate
                      </span>
                    </div>
                  </div>

                  {/* Decorative seal */}
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-blush rounded-full opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page content */}
      <section className="container mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-wine">
            We founded Palmas Recovery in 2021 with a shared vision: to redefine
            the post-operative experience.
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-olive-dark">
            <h4 className="text-2xl font-semibold text-wine">
              With more than eight years of experience in medical hospitality
              and strong collaboration with top plastic surgeons in Mexico, we
              prioritize your post-operative concerns and goals.
            </h4>

            <p>
              We understand that recovery is most effective when approached
              holistically. From expert procedures to tailored aftercare, every
              step of our process is thoughtfully designed to ensure your
              well-being.
            </p>

            <p>Your needs are at the core of everything we do.</p>

            <div className="pt-10">
              <h3 className="text-3xl font-bold mb-4 text-wine">Mission</h3>
              <p className="text-xl font-semibold text-olive-dark">
                Our mission is to provide an efficient, timely, and welcoming
                environment that feels like a second home.
              </p>
              <h3 className="text-2xl font-semibold mt-8 text-wine">
                We are committed to helping you achieve an optimal recovery,
                ensuring you return home with peace of mind.
              </h3>
            </div>

            <div className="pt-12">
              <h2 className="text-4xl font-bold mb-8 text-wine">
                Our Core Pillars
              </h2>

              <div className="space-y-10">
                <div className="border-l-4 border-sage pl-6">
                  <h3 className="text-2xl font-semibold text-wine">
                    Safety and Accreditation:
                  </h3>
                  <h4 className="mt-2 text-lg text-olive-dark">
                    Your health is our top priority. We ensure that all care is
                    supported by our professional expertise and the highest
                    medical accreditations in our team.
                  </h4>
                </div>

                <div className="border-l-4 border-blush pl-6">
                  <h3 className="text-2xl font-semibold text-wine">
                    Expert Support:
                  </h3>
                  <h4 className="mt-2 text-lg text-olive-dark">
                    We provide continuous, expert guidance throughout your
                    recovery journey. We don't just monitor your progress; we
                    actively navigate this journey alongside you.
                  </h4>
                </div>

                <div className="border-l-4 border-olive-dark pl-6">
                  <h3 className="text-2xl font-semibold text-wine">
                    Flexibility and Adaptability:
                  </h3>
                  <h4 className="mt-2 text-lg text-olive-dark">
                    We understand that each person's healing process is unique.
                    Our services are fully adaptable, with no minimum or maximum
                    stay required, to meet your individual needs.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
