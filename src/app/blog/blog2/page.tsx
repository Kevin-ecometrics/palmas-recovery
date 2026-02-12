import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaThermometerHalf, FaSun, FaLeaf, FaSnowflake, FaCheckCircle } from "react-icons/fa";
import { MdSpa } from "react-icons/md";

export default function Blog2() {
  return (
    <>
      {/* Meta tags for SEO */}
      <Head>
        <title>The ideal weather for plastic surgery & smooth recovery in Tijuana</title>
        <meta name="description" content="Why autumn is the golden season for your surgery and post-op care. In this blog, we provide an in-depth look at the seasonal benefits for each procedure." />
        <meta name="keywords" content="Recovery, procedures, season, healing, Tijuana" />
        <link rel="canonical" href="https://www.palmasrecovery.com/The ideal weather for plastic surgery & smooth recovery in Tijuana?" />
      </Head>

      <Navbar />

      {/* Hero Section with Featured Image */}
      <div className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-[#657251] to-[#8a9a5b] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/path-to-tijuana-image.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group mb-8 w-fit"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-semibold">
                  <MdSpa />
                  Recovery & Wellness
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                The Ideal Weather for Recovery in Tijuana
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>November 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>8 min read</span>
                </div>
              </div>
            </div>

            {/* Optional: Add a featured image or graphic here */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Takeaways</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-white mt-1 flex-shrink-0" />
                    <span>Autumn offers optimal healing conditions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-white mt-1 flex-shrink-0" />
                    <span>Lower UV radiation protects scars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-white mt-1 flex-shrink-0" />
                    <span>Compression garments more comfortable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-white mt-1 flex-shrink-0" />
                    <span>Reduced swelling and inflammation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="bg-white">
        {/* Introduction Section - Full Width */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Sidebar - Table of Contents */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Table of Contents</h3>
                  <nav className="space-y-2">
                    <a href="#timing" className="block text-sm text-gray-600 hover:text-[#657251] transition-colors">Why Timing Matters</a>
                    <a href="#weather" className="block text-sm text-gray-600 hover:text-[#657251] transition-colors">Weather & Recovery</a>
                    <a href="#autumn" className="block text-sm text-gray-600 hover:text-[#657251] transition-colors">Golden Season</a>
                    <a href="#procedures" className="block text-sm text-gray-600 hover:text-[#657251] transition-colors">By Procedure</a>
                    <a href="#palmas" className="block text-sm text-gray-600 hover:text-[#657251] transition-colors">Palmas Recovery</a>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-4">
                {/* Introduction Card */}
                <div id="timing" className="bg-gradient-to-br from-[#657251]/5 to-[#8a9a5b]/5 rounded-3xl p-10 md:p-12 mb-16 border border-[#657251]/10">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                    Timing Your Transformation: Why the Season Matters
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                      Tijuana has earned its reputation as the global capital of medical tourism and cosmetic surgery. Situated at the world's busiest border, it offers world-class medical expertise combined with a vibrant culture.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      However, when planning your journey, there is one factor many patients overlook: <span className="font-bold text-[#657251]">the weather</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Weather Matters Section - Full Width Layout */}
        <div id="weather" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-1"></div>
              <div className="lg:col-span-4">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-[#657251] flex items-center justify-center">
                    <FaThermometerHalf className="text-white text-2xl" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Why Does Weather Matter for Recovery?
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                      <FaCheckCircle className="text-blue-600 text-3xl" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Reduce Inflammation</h3>
                    <p className="text-gray-600 leading-relaxed">Lower risks of swelling and infection in optimal conditions.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                      <FaCheckCircle className="text-green-600 text-3xl" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Optimize Healing</h3>
                    <p className="text-gray-600 leading-relaxed">Keep your body cool for faster, smoother recovery.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-6">
                      <FaCheckCircle className="text-purple-600 text-3xl" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Peace of Mind</h3>
                    <p className="text-gray-600 leading-relaxed">Comfort during the most sensitive days of your journey.</p>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-8 rounded-r-xl">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    <span className="font-bold">Important:</span> While there is no "one-size-fits-all" date, your surgeon will evaluate your health and procedure type to ensure you are operating under peak conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Golden Season Section - Full Width */}
        <div id="autumn" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full mb-6">
                <FaLeaf />
                <span className="font-bold text-sm uppercase tracking-wider">Best Season</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Why Autumn is the "Golden Season"
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialists often cite Autumn as the ideal time for cosmetic procedures in Mexico
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Benefit 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#657251] to-[#8a9a5b] rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl p-10 border-2 border-gray-100 group-hover:border-[#657251]/30 transition-all h-full">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-8">
                    <FaSnowflake className="text-blue-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Reduced Swelling</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Moderate temperatures prevent excessive sweating that can irritate fresh incisions and surgical wounds. Cool air is a natural ally in keeping inflammation down.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#657251] to-[#8a9a5b] rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl p-10 border-2 border-gray-100 group-hover:border-[#657251]/30 transition-all h-full">
                  <div className="w-20 h-20 rounded-2xl bg-yellow-50 flex items-center justify-center mb-8">
                    <FaSun className="text-yellow-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Lower UV Radiation</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Solar radiation is the enemy of a healing scar. Reduced UV levels significantly lower the risk of skin discoloration around incision sites.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#657251] to-[#8a9a5b] rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl p-10 border-2 border-gray-100 group-hover:border-[#657251]/30 transition-all h-full">
                  <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center mb-8">
                    <MdSpa className="text-green-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Comfort in Compression</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Compression garments are much more comfortable when it isn't 90°F (32°C) outside. Better compliance with post-op care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Benefits by Procedure - Two Column Layout */}
        <div id="procedures" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-1"></div>
              <div className="lg:col-span-4">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12">
                  Seasonal Benefits by Procedure
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Breast Surgeries */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border-2 border-gray-200 hover:shadow-xl transition-all">
                      <div className="w-14 h-14 rounded-full bg-[#657251]/10 flex items-center justify-center mb-6">
                        <span className="text-3xl">🩺</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#657251] mb-4">
                        Breast Surgeries
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">Augmentation or Reduction</p>
                      <p className="text-gray-700 leading-relaxed">
                        These procedures benefit greatly from the cooler months. A cool climate makes wearing the necessary postoperative surgical bra much more bearable and reduces the discomfort associated with heat-induced swelling.
                      </p>
                    </div>

                    {/* Facial Rejuvenation */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border-2 border-gray-200 hover:shadow-xl transition-all">
                      <div className="w-14 h-14 rounded-full bg-[#657251]/10 flex items-center justify-center mb-6">
                        <span className="text-3xl">✨</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#657251] mb-4">
                        Facial Rejuvenation
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">Rhinoplasty, Facelift, Blepharoplasty</p>
                      <p className="text-gray-700 leading-relaxed">
                        Facial skin is incredibly sensitive after surgery. Choosing a season with low UV radiation protects your face from blemishes and allows you to recover more discreetly.
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Body Remodeling */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border-2 border-gray-200 hover:shadow-xl transition-all">
                      <div className="w-14 h-14 rounded-full bg-[#657251]/10 flex items-center justify-center mb-6">
                        <span className="text-3xl">💪</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#657251] mb-4">
                        Body Remodeling
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">Liposuction, Tummy Tuck, BBL</p>
                      <p className="text-gray-700 leading-relaxed">
                        For surgeries requiring extensive bandages, the fall and winter months promote better consistency in wearing your garments, which is crucial for achieving your final aesthetic goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Palmas Recovery - Full Width Premium Section */}
        <div id="palmas" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#657251] to-[#8a9a5b]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                Why Choose Palmas Recovery?
              </h2>
              <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                No matter what time of year you choose, Palmas Recovery is designed to provide a perfect "micro-climate" for your healing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { icon: "🏥", title: "24/7 Professional Care", desc: "In-house doctors and round-the-clock nursing" },
                { icon: "❄️", title: "Climate-Controlled Comfort", desc: "Full air conditioning in all installations" },
                { icon: "🛏️", title: "Hospital-Grade Amenities", desc: "Medical beds, high-speed Wi-Fi, and Netflix" },
                { icon: "💆", title: "Holistic Healing", desc: "Specialized lymphatic drainage massage packages" },
                { icon: "🍽️", title: "Nutritional Support", desc: "Chef-prepared meals tailored for recovery" },
                { icon: "📅", title: "Flexible Booking", desc: "No minimum stay policy for your comfort" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h3>
              <p className="text-white/90 mb-10 text-xl max-w-2xl mx-auto">Book today and let us handle the details while you focus on your transformation.</p>
              <Link href="/contact">
                <button className="px-12 py-5 bg-white text-[#657251] font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl text-xl">
                  Contact a Specialist
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-3 text-[#657251] hover:text-[#657251]/80 transition-colors font-medium text-lg"
              >
                <FaArrowLeft />
                Back to all articles
              </Link>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl">
                  📤
                </button>
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-xl">
                  🔖
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}