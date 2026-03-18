import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHotel, FaSuitcase, FaArrowRight, FaUserMd } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

const BLOG_IMAGES = [
  "/blog1.png", // Entrada de blog 1
  "/blog2.jpg", // Entrada de blog 2
  "/blog3.jpg", // Entrada de blog 3
];

const featuredPosts = [
  {
    id: "blog1",
    title: "What to Pack for Your Post-Op Recovery House",
    excerpt:
      "Your complete checklist for a stress-free recovery experience. Prepare like a pro with our essential packing guide.",
    category: "Recovery Preparation",
    image: BLOG_IMAGES[0],
    icon: <FaSuitcase className="text-xl" />,
  },
  {
    id: "blog2",
    title: "When is the Best Time for Plastic Surgery in Mexico?",
    excerpt:
      "A comprehensive guide to choosing the optimal season for your cosmetic procedure and recovery in Mexico.",
    category: "Planning Guide",
    image: BLOG_IMAGES[1],
    icon: <FaCalendarAlt className="text-xl" />,
  },
  {
    id: "blog3",
    title:
      "Recovery House vs. Hotel: Why Your Healing Depends on Professional Care",
    excerpt:
      "Understanding the critical differences between professional recovery care and standard hotel accommodations.",
    category: "Recovery Care",
    image: BLOG_IMAGES[2],
    icon: <FaHotel className="text-xl" />,
  },
];

export default function BlogHome() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#657251]/10 via-white to-[#657251]/5 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#657251]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#657251]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-[#657251]"></div>
            <span className="text-[#657251] font-semibold tracking-wider uppercase text-sm">
              Recovery Insights
            </span>
            <div className="w-12 h-px bg-[#657251]"></div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Your Guide to
            <br />
            <span className="text-[#657251]">Surgical Recovery</span>
          </h1>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Expert advice, practical tips, and essential information for your
            post-operative recovery journey in Mexico.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Articles
            </h2>
            <div className="flex items-center gap-2 text-[#657251]">
              <span className="text-sm font-medium">Latest Insights</span>
              <div className="w-8 h-px bg-[#657251]"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#657251]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                      <div className="text-[#657251]">{post.icon}</div>
                      <span className="text-gray-900">{post.category}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#657251] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-6">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-[#657251] font-medium hover:text-[#657251]/80 transition-colors group/btn"
                  >
                    Read Article
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
