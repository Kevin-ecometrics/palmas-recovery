import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { 
  FaHotel,
  FaUserMd,
  FaShieldAlt,
  FaBed,
  FaUtensils,
  FaHeartbeat,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import Link from "next/link";

export default function Blog3() {
  const reasons = [
    {
      icon: <FaUserMd className="text-2xl" />,
      title: "24/7 Medical Supervision",
      description: "Recovery houses provide continuous professional medical care that hotels simply cannot match.",
      details: [
        "Licensed nurses available around the clock",
        "Regular vital signs monitoring",
        "Immediate response to complications",
        "Direct communication with your surgeon"
      ]
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Specialized Post-Operative Care",
      description: "Recovery is designed specifically for surgical patients with customized support systems.",
      details: [
        "Pain management by trained professionals",
        "Proper wound care and dressing changes",
        "Assistance with mobility and daily activities",
        "Medication administration on schedule"
      ]
    },
    {
      icon: <FaBed className="text-2xl" />,
      title: "Healing-Focused Environment",
      description: "Every aspect of the environment is optimized for recovery, not just comfort.",
      details: [
        "Medical-grade beds and equipment",
        "Quiet, controlled atmosphere",
        "Reduced risk of infection",
        "Proper sanitation protocols"
      ]
    }
  ];

  const comparison = [
    {
      feature: "24/7 Medical Staff",
      recoveryHouse: <FaCheckCircle className="text-[#657251]" />,
      hotel: <FaTimesCircle className="text-red-500" />
    },
    {
      feature: "Medical Equipment",
      recoveryHouse: <FaCheckCircle className="text-[#657251]" />,
      hotel: <FaTimesCircle className="text-red-500" />
    },
    {
      feature: "Pain Management",
      recoveryHouse: <FaCheckCircle className="text-[#657251]" />,
      hotel: <FaTimesCircle className="text-red-500" />
    },
    {
      feature: "Wound Care",
      recoveryHouse: <FaCheckCircle className="text-[#657251]" />,
      hotel: <FaTimesCircle className="text-red-500" />
    },
    {
      feature: "Medication Administration",
      recoveryHouse: <FaCheckCircle className="text-[#657251]" />,
      hotel: <FaTimesCircle className="text-red-500" />
    },
    {
      feature: "Emergency Response",
      recoveryHouse: <FaCheckCircle className="text-[#657251]" />,
      hotel: <FaTimesCircle className="text-red-500" />
    }
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#657251]/10 via-white to-[#657251]/5 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#657251]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#657251]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Botón Back to All Articles alineado a la izquierda con línea roja */}
          <div className="relative pl-6 mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#657251] hover:text-[#657251]/80 transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to All Articles
            </Link>
          </div>

          <div className="text-center mb-8">
            {/* Título "Planning Guide" centrado */}
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-px bg-[#657251]"></div>
              <span className="text-[#657251] font-semibold tracking-wider uppercase text-sm">
                Recovery Care Guide
              </span>
              <div className="w-12 h-px bg-[#657251]"></div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Recovery House vs. Hotel:<br />
              <span className="text-[#657251]">3 Reasons Why Your Healing Depends on Professional Care</span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Understanding the critical differences between professional recovery care and standard hotel accommodations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                After cosmetic surgery in Mexico, many patients face a crucial decision: 
                should they recover in a specialized recovery house or a standard hotel? 
                While hotels offer comfort and convenience, they lack the essential medical 
                support needed for optimal post-operative recovery.
              </p>
              <p>
                Here are the three most important reasons why choosing a professional 
                recovery house can significantly impact your healing journey and final results.
              </p>
            </div>
          </div>
        </div>

        {/* Key Reasons */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10">
            3 Critical Reasons to Choose Professional Recovery Care
          </h2>
          
          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl border-2 border-[#657251]/30 bg-white transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#657251]/10 border border-[#657251]/20 text-[#657251] flex items-center justify-center group-hover:bg-[#657251]/20 transition-colors">
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-[#657251]/10 border border-[#657251]/20 text-[#657251] group-hover:bg-[#657251]/20 transition-colors">
                        {reason.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{reason.title}</h3>
                    </div>
                    <p className="text-gray-700 text-lg mb-6">{reason.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {reason.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <FaCheckCircle className="text-[#657251] mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10">
            Direct Comparison: Recovery House vs. Hotel
          </h2>
          
          <div className="bg-white rounded-2xl border-2 border-[#657251]/30 overflow-hidden">
            <div className="grid grid-cols-3 border-b border-[#657251]/30 bg-[#657251]/10">
              <div className="p-4 font-bold text-gray-900">Feature</div>
              <div className="p-4 font-bold text-gray-900 text-center">Recovery House</div>
              <div className="p-4 font-bold text-gray-900 text-center">Hotel</div>
            </div>
            
            {comparison.map((row, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="p-4 border-r border-[#657251]/20 text-gray-700">{row.feature}</div>
                <div className="p-4 border-r border-[#657251]/20 flex items-center justify-center">
                  {row.recoveryHouse}
                </div>
                <div className="p-4 flex items-center justify-center">
                  {row.hotel}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-[#657251]" />
              <span className="text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTimesCircle className="text-red-500" />
              <span className="text-gray-700">Not Available</span>
            </div>
          </div>
        </div>

        {/* Real-Life Scenario */}
        <div className="mb-12 bg-gradient-to-r from-[#657251]/10 to-white p-8 rounded-2xl border border-[#657251]/30">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Consider This Scenario
          </h3>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              Imagine waking up at 2 AM with unexpected pain or swelling after your surgery. 
              In a recovery house, a trained nurse is seconds away to assess your condition, 
              provide appropriate pain relief, and contact your surgeon if needed.
            </p>
            <p>
              In a hotel, you're alone, possibly in a foreign country, trying to manage 
              medications yourself or waiting hours for help. This difference in response 
              time and expertise can significantly impact your comfort and safety.
            </p>
          </div>
        </div>

        {/* Final Recommendation */}
        <div className="mb-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              The Bottom Line
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                While hotels may seem like a cost-effective option initially, they lack the 
                medical infrastructure and expertise necessary for proper surgical recovery. 
                The risks of complications, improper care, and delayed response to emergencies 
                are significantly higher in hotel settings.
              </p>
              <p>
                Professional recovery houses provide peace of mind, specialized care, and 
                an environment specifically designed for healing. Your surgical investment 
                deserves proper aftercare to ensure optimal results and a smooth recovery journey.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link 
              href="/blog/blog2"
              className="inline-flex items-center gap-2 text-[#657251] hover:text-[#657251]/80 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Previous: Best Time for Surgery
            </Link>
          </div>
          
          <div className="text-right">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#657251] hover:text-[#657251]/80 transition-colors border border-[#657251] rounded-full hover:bg-[#657251]/5"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
}