import React from "react";
import Navbar from "@/app/components/Navbar";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="container mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            We founded Palmas Recovery in 2021 with a shared vision: to redefine
            the post-operative experience.
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <h4 className="text-2xl font-semibold">
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
              <h3 className="text-3xl font-bold mb-4">Misión</h3>
              <p className="text-xl font-semibold">
                Our mission is to provide an efficient, timely, and welcoming
                environment that feels like a second home.
              </p>
              <h3 className="text-2xl font-semibold mt-8">
                We are committed to helping you achieve an optimal recovery,
                ensuring you return home with peace of mind.
              </h3>
            </div>

            <div className="pt-12">
              <h2 className="text-4xl font-bold mb-8">Our Core Pillars</h2>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-semibold">
                    Safety and Accreditation:
                  </h3>
                  <h4 className="mt-2 text-lg text-gray-700">
                    Your health is our top priority. We ensure that all care is
                    supported by our professional expertise and the highest
                    medical accreditations in our team.
                  </h4>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">Expert Support:</h3>
                  <h4 className="mt-2 text-lg text-gray-700">
                    We provide continuous, expert guidance throughout your
                    recovery journey. We don’t just monitor your progress; we
                    actively navigate this journey alongside you.
                  </h4>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Flexibility and Adaptability:
                  </h3>
                  <h4 className="mt-2 text-lg text-gray-700">
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
