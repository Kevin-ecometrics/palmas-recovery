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
  FaMapMarkerAlt,
  FaCertificate,
  FaHandshake,
} from "react-icons/fa";
import Link from "next/link";

export default function Blog5() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[60vh]">
        <img
          src="/imagenes blog 5/Palmas recovery es tu equipo con una casa de recuperación de primer nivel en Tijuana.webp"
          alt="Palmas Recovery is your team with a premier recovery house in Tijuana"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center px-4">
            Are You a Plastic Surgeon Looking to Extend Your Team's Excellence with a Premier Recovery House in Tijuana?
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

        <p className="text-lg text-gray-700 mb-8">
          In the field of plastic surgery, we know that an extraordinary result does not conclude at the last suture;{" "}
          <span className="font-semibold text-[#70805a]">60% of success depends on a flawless post-operative process</span>. At Palmas Recovery, we become the medical, human, and logistical extension of your professional practice.
        </p>

        <p className="text-gray-700 mb-8">
          We are a recovery house created and led by physicians, staffed by a team of certified nurses, whose mission is to deliver excellence in post-operative care. We operate under the rigor of a clinical environment with expert monitoring 24 hours a day, 7 days a week, while offering the privacy, luxury, and peace of mind of a space designed exclusively for the rest and healing of your patients.
        </p>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Palmas Recovery House Has One of the Best Locations: In the Medical Heart of the City
        </h3>

        <p className="text-gray-700 mb-4">If you are looking for a partnership that optimizes your logistics and provides absolute comfort, we are located at the most strategic point in the region:</p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Location</p>
                <p className="text-gray-700">In the heart of Zona Río, steps away from Tijuana's leading hospitals and surgical clinics.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Connectivity</p>
                <p className="text-gray-700">Just 10 minutes from the international border crossing.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaSpa className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Surroundings</p>
                <p className="text-gray-700">Located in a central area surrounded by the best hotels and shopping centers, ensuring safety, accessibility, and comfort for both your patients and their companions.</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#8a9a6a] mt-10 mb-4">
          Palmas Recovery House Is COEPRIS-Certified and Strictly Adheres to International Patient Safety Goals
        </h3>

        <p className="text-gray-700 mb-6">
          We are a fully regulated institution, with active permits and approval from COEPRIS. We guarantee strict sanitary control and operate under international safety protocols.
        </p>

        <p className="text-gray-700 mb-4">
          We understand Patient Safety as the set of structured actions to prevent and reduce risks. For this reason, we strictly adapt the International Patient Safety Goals (established by the WHO) into our daily care model:
        </p>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/imagenes blog 5/Los doctores estan siempre atentos para respaldar tus resultados.webp"
              alt="Doctors are always attentive to support your results"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">Doctors are always attentive to support your results</p>
            </div>
          </div>
        </div>

        <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-4">
          <li>
            <span className="font-semibold text-[#70805a]">Correct Patient Identification:</span> Unambiguous registration processes to prevent any identity errors in care delivery.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Improved Effective Communication:</span> Exact transmission of your post-operative instructions. We eliminate the use of abbreviations, unsupported verbal orders, or dose ambiguities in written prescriptions.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Safety in High-Alert Medication Management:</span> Extremely strict management, storage, control, and administration of analgesics, anticoagulants, and post-operative drugs to minimize any possibility of error.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Guarantee of Correct Procedures:</span> We ensure precise and personalized follow-up strictly aligned with the recovery plan you designed for each patient.
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Reduction of Healthcare-Associated Infections (HAIs):</span> We implement a strict hand hygiene culture (soap, water, and alcohol gel) before and after every interaction, along with rigorous sterilization management and control of Biological-Infectious Hazardous Waste (RPBI).
          </li>
          <li>
            <span className="font-semibold text-[#70805a]">Reduction of Fall-Related Injury Risk:</span> Our facilities feature adapted infrastructure, safety railings in correct positions, preventive physical support when the patient's condition requires it, and constant staff assistance.
          </li>
        </ul>

        <h4 className="text-lg font-bold text-[#8a9a6a] mb-4">
          At Palmas Recovery House, We Protect Your Reputation Against Market Informality
        </h4>

        <p className="text-gray-700 mb-4">
          With the rapid growth of medical tourism in Tijuana, hundreds of informal recovery houses and "adapted hotels or residences" have proliferated, operating without adequate regulations, without on-call healthcare staff trained to handle emergencies.
        </p>

        <p className="text-gray-700 mb-8">
          The lack of pain management protocols, the absence of biomedical waste control, and the lack of sterilized areas often trigger infections, healing problems, or seromas, putting patients undergoing invasive procedures at serious risk. This not only affects the patient's health but <span className="font-semibold text-[#70805a]">directly compromises the plastic surgeon's reputation</span> and the medical integrity of our region.
        </p>

        <h2 className="text-2xl font-bold text-[#70805a] mt-12 mb-6">
          The Support of Experience: The Story of Palmas Recovery
        </h2>

        <p className="text-gray-700 mb-4">
          Palmas Recovery was founded in 2021 with the goal of bringing hospital-grade standards to a boutique, personalized care model. Its founders, Dr. Raúl and Dr. Cecilia, have more than 11 years of clinical experience caring for hundreds of bariatric and plastic surgery patients across several prestigious hospitals in the city.
        </p>

        <p className="text-gray-700 mb-6">
          Today, Palmas Recovery has evolved into a facility with expanded premises and a robust team of healthcare professionals rotating 24/7 to meticulously assist both local and international patients.
        </p>

        <p className="text-gray-700 mb-4 font-semibold">Our infrastructure and premium services include:</p>

        <div className="space-y-4 mb-10">
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Adapted Facilities</p>
                <p className="text-gray-700">Wide hospital-style hallways, access ramps, an elevator, and bathrooms perfectly equipped for post-surgical mobility.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaBed className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Clinical Rooms</p>
                <p className="text-gray-700">Hospital-grade beds and areas equipped with air conditioning.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaUserMd className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Specialized Monitoring</p>
                <p className="text-gray-700">Continuous vital sign review, along with daily wound cleaning and assessment.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Directed Nutrition</p>
                <p className="text-gray-700">Specialized diet with an anti-inflammatory focus, high in protein and fiber to support tissue regeneration and anesthesia elimination.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaSpa className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">In-House Logistics</p>
                <p className="text-gray-700">Therapeutic massages and lymphatic drainage performed on-site, laundry service, and specialized compression garment washing.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHospital className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Medical Transport</p>
                <p className="text-gray-700">Safe, private transportation to all post-operative follow-up appointments.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#f2e9dc] rounded-xl p-6 shadow">
            <div className="flex items-start gap-4">
              <FaHandshake className="text-3xl text-[#70805a] mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-[#70805a] mb-1">Human and Family Care</p>
                <p className="text-gray-700">Accommodation for one (1) companion per patient and flexible visit policies for family members. We firmly believe that a transparent environment brings peace of mind to families and the certainty that their loved one is in the best hands.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/imagenes blog 5/Instalaciones de primer nivel para la recuperacion de tus pacientes.webp"
              alt="First-class facilities for the recovery of your patients"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">First-class facilities for the recovery of your patients</p>
            </div>
          </div>
        </div>

        <div className="bg-[#f2e9dc] rounded-xl p-8 flex flex-col items-center text-center shadow mb-12">
          <FaCheckCircle className="text-4xl text-[#70805a] mb-4" />
          <h4 className="text-2xl font-bold text-[#70805a] mb-4">
            Let's Build the Ideal Medical and Logistical Team in Tijuana
          </h4>
          <p className="text-gray-700 mb-4">
            We work with the best specialist physicians, always protecting the integrity of the profession and providing a safety shield for your medical practice.
          </p>
          <p className="text-gray-700 mb-6">
            Let us care for your patients with the same passion, rigor, and professionalism with which you operate on them. Make Palmas Recovery your strategic partner for surgical success.
          </p>
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
              <Link href="/blog/blog4" className="group inline-flex items-center gap-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#70805a] group-hover:bg-[#70805a]/10 transition">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Article</p>
                  <p className="font-semibold">Plastic Surgery in Tijuana</p>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/blog/blog1" className="group inline-flex items-center gap-3 text-[#70805a] hover:text-[#5f6f4a] transition-colors">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Next Article</p>
                  <p className="font-semibold">What to Pack for Recovery</p>
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
