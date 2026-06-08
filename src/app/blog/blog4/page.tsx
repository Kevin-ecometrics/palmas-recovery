import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FaArrowLeft,
  FaUserMd,
  FaShieldAlt,
  FaBed,
  FaCheckCircle,
  FaHospital,
  FaSpa,
  FaStethoscope,
  FaHeartbeat,
} from "react-icons/fa";
import Link from "next/link";

export default function Blog4() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img
          src="/images blog 4/Cirugia plastica en Tijuana con expertos.webp"
          alt="Plastic surgery in Tijuana with experts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            Considering Plastic Surgery? Discover Why Tijuana Is the Ideal Destination and How to Choose the Right Specialist
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#70805a] hover:text-[#5f6f4a] transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>
        </div>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-4">
          Is Tijuana a Good Place for Plastic Surgery?
        </h4>

        <p className="text-lg text-gray-700 mb-6">
          Whether you are a local or international patient, choosing Tijuana for your plastic surgery is one of the most reliable decisions you can make. The city is recognized worldwide as the mecca of medical tourism, home to some of Mexico's finest specialists and board-certified plastic surgeons.
        </p>

        <p className="text-gray-700 mb-4">Tijuana stands out nationally and internationally for its exceptional expertise in procedures such as:</p>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
          <li>Liposuction and body contouring.</li>
          <li>Abdominoplasty (tummy tuck).</li>
          <li>Mommy makeover.</li>
          <li>Buttock lift.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          Advantages of Your Plastic Surgery in Tijuana
        </h2>

        <p className="text-gray-700 mb-8">
          For patients traveling from the United States or Canada, the geographic location is unmatched. The city offers excellent connectivity thanks to its strategic proximity to Tijuana International Airport and Los Angeles International Airport (LAX), making for a comfortable, direct transfer.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          How to Choose a Good Plastic Surgeon and a Safe Clinic in Tijuana
        </h3>

        <p className="text-gray-700 mb-6">
          As healthcare professionals, we believe it is essential to speak with complete transparency about what many clinics or individuals leave out. In some cases, malpractice by unqualified individuals has led to complications and unfortunate headlines. It is completely understandable that this causes fear or uncertainty, making many patients hesitant to move forward.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">To restore your peace of mind, here are the key points to protect your health and your investment:</p>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-4">Research Your Specialist</h4>

        <p className="text-gray-700 mb-4">The training required of a certified plastic surgeon in Mexico is extremely rigorous and mandatory:</p>

        <div className="space-y-4 mb-8">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaStethoscope className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">General Surgery</p>
                <p className="text-gray-700">Requires at least 2 years of prior specialization in general surgery, performing a minimum of 150 surgeries per year in public and private hospitals accredited by the Ministry of Health.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaUserMd className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Plastic and Reconstructive Surgery</p>
                <p className="text-gray-700">Following general surgery, they must complete a mandatory 4-year postgraduate program.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Official Board Certification</p>
                <p className="text-gray-700">Upon completion, the physician must pass a rigorous certification exam administered by the Mexican Council of Plastic, Aesthetic, and Reconstructive Surgery (CMCPER).</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          How to Avoid Fraud and Protect Your Life When Choosing a Plastic Surgeon in Tijuana
        </h3>

        <p className="text-gray-700 mb-4">
          We want to make this especially clear: a general practitioner with a master's degree in aesthetics does <span className="font-semibold text-[#70805a]">NOT</span> have the formal training or authorization to operate in any public or private hospital.
        </p>

        <div className="bg-[#70805a]/10 border-l-4 border-[#70805a] rounded-r-xl p-6 mb-8">
          <p className="text-gray-800">
            <span className="font-bold text-[#70805a]">Vital tip:</span> Make sure to verify your doctor's general medicine license and their plastic surgery specialty license. This information should be displayed in their office, on their social media, or provided immediately upon request.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          Why You Should Not Go to an "Aesthetician" with a Master's Degree for Your Plastic Surgery in Tijuana
        </h2>

        <p className="text-gray-700 mb-4">
          If a complication arises in the operating room, a physician without the official specialty does not have the credentials or training to save a life.
        </p>

        <p className="text-gray-700 mb-6">
          Likewise, if the facility does not display visible or publicly accessible permits, it is most likely an unauthorized clandestine clinic not approved by COFEPRIS (or COEPRIS at the state level).
        </p>

        <p className="text-gray-700 mb-8">
          The key to choosing the right specialist does not lie in how "beautiful" the clinic looks, but in the surgeon's level of training, the team's preparedness for any emergency, and the use of top-tier facilities operating under the strict safety protocols of a hospital operating room.
        </p>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images blog 4/Liposuccion y contorno corporal   tummy tuck Mommy makeover con expertos en Tijuana.webp"
              alt="Liposuction, body contouring, tummy tuck and mommy makeover with experts in Tijuana"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">Liposuction, body contouring, tummy tuck and mommy makeover with experts in Tijuana</p>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-6">
          At Palmas Recovery, we work exclusively with board-certified plastic surgeons.
        </h4>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-4 mb-4">
          What to Expect During the Consultation Process
        </h3>

        <p className="text-gray-700 mb-4">
          Your surgeon and their clinical team should convey confidence and complete transparency from the very first contact. A human-centered approach means answering each of your questions with respect and clarity, no matter how small they may seem.
        </p>

        <p className="text-gray-700 mb-8">
          During this stage, managing your recovery is key. Your doctor will guide you and may suggest a recovery house. It is essential that the chosen facility holds all current health permits and is supervised by certified doctors and nurses — not by auxiliary staff. Once all details are clarified and the surgery date is set, it is standard to spend an initial stay at the hospital to ensure your immediate progress is perfect.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Let's Talk About Costs and Packages for Plastic Surgery in Tijuana
        </h3>

        <p className="text-gray-700 mb-4">
          Most plastic surgeons offer "all-inclusive" packages. When choosing a package that already includes a recovery house, make sure it strictly complies with hygiene, health, and expert monitoring protocols.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">A complete and safe package typically includes:</p>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
          <li>Essential post-operative services (such as lymphatic drainage).</li>
          <li>Follow-up visits with your surgeon.</li>
          <li>Transfers between the airport, clinic, and recovery house.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          Is Staying at a Recovery House Necessary After Plastic Surgery?
        </h2>

        <p className="text-gray-700 mb-6">
          Your surgical procedure does not end when you leave the operating room — it concludes successfully once you receive your final discharge.
        </p>

        <p className="text-gray-700 mb-4">During your stay at Palmas Recovery, we offer all-inclusive packages meticulously designed to ensure your overall well-being and mitigate the most common risks:</p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Infections</p>
                <p className="text-gray-700">We perform daily monitoring and wound care under strict hygiene standards.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHeartbeat className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Pain</p>
                <p className="text-gray-700">On-site doctors and nurses administer and manage your medication continuously to ensure your progress remains comfortable.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Anxiety</p>
                <p className="text-gray-700">Our medical and nursing team is available to listen and support you 24 hours a day. You can also book your stay with a companion, receive daily visits from family or friends, and choose between private or shared rooms to foster a sense of community and accompaniment.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaUserMd className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Complications</p>
                <p className="text-gray-700">We achieve early detection and maintain rapid action and direct communication with your plastic surgeon.</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-2">
          Because post-operative care is the real secret to success
        </h4>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-4 mb-4">
          60% of your surgery's final results depend on post-operative care.
        </h3>

        <p className="text-gray-700 mb-6">
          Procedures such as liposuction, tummy tuck, breast augmentation or reduction, and facelift require precise wound care, mobility assistance, and meticulous clinical follow-up to prevent serious complications such as thrombosis, fibrosis, or infection.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">Our services at Palmas Recovery include:</p>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
          <li>Rooms equipped with hospital-grade beds.</li>
          <li>Specialized laundry service and compression garment washing.</li>
          <li>Nurses available 24 hours a day.</li>
          <li>Anti-inflammatory nutrition rich in protein (to regenerate tissue faster) and high in fiber (to help your body eliminate anesthesia).</li>
          <li>Direct coordination with your plastic surgeon from day one.</li>
          <li>Private transportation to all your follow-up appointments.</li>
          <li>Massages and lymphatic drainage to reduce fluid retention, decrease inflammation, and optimize circulation.</li>
        </ul>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images blog 4/Instalaciones de primer nivel en las zonas mas seguras de tijuana para tu postoperatorio.webp"
              alt="First-class facilities in the safest areas of Tijuana for your post-operative care"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">First-class facilities in the safest areas of Tijuana for your post-operative care</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f2e9dc] rounded-xl p-8 flex flex-col items-center text-center shadow mb-12">
          <FaCheckCircle className="text-4xl text-[#70805a] mb-4" />
          <h3 className="text-2xl font-bold text-[#70805a] mb-2">
            Put Your Health in Expert Hands
          </h3>
          <p className="text-gray-700 mb-4">Have your surgery with board-certified plastic surgeons and experience your post-operative recovery with certified doctors and care specialists.</p>
          <Link
            href="/book"
            className="inline-block px-8 py-3 bg-[#70805a] text-white font-bold rounded-full shadow hover:bg-[#5f6f4a] transition"
          >
            Contact Us Today
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <Link href="/blog/blog3" className="group inline-flex items-center gap-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#70805a] group-hover:bg-[#70805a]/10 transition">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Article</p>
                  <p className="font-semibold">Recovery House vs. Hotel</p>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/blog/blog5" className="group inline-flex items-center gap-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Next Article</p>
                  <p className="font-semibold">Recovery House for Plastic Surgeons</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#70805a] group-hover:bg-[#70805a]/10 transition rotate-180">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors border border-[#70805a] rounded-full hover:bg-[#70805a]/5"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
