import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";
import { 
  FaSuitcase, 
  FaTshirt, 
  FaTooth, 
  FaFileMedical, 
  FaTape, 
  FaBook, 
  FaChargingStation, 
  FaPills,
  FaArrowLeft
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { GiWaterBottle } from "react-icons/gi";
import Link from "next/link";

export default function Blog1() {
  const packingItems = [
    {
      icon: <FaTshirt className="text-2xl" />,
      title: "Comfortable, loose clothing",
      description: "Easy to put on and take off, preferably with front buttons or zippers."
    },
    {
      icon: <FaTooth className="text-2xl" />,
      title: "Personal hygiene items",
      description: "Toothbrush, toothpaste, face wipes, dry shampoo, deodorant, and gentle soap."
    },
    {
      icon: <FaFileMedical className="text-2xl" />,
      title: "Medical documents",
      description: "Surgery instructions, prescriptions, and ID."
    },
    {
      icon: <FaTape className="text-2xl" />,
      title: "Compression garments",
      description: "As recommended by your surgeon."
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Entertainment",
      description: "Books, magazines, headphones, or a tablet for movies and music."
    },
    {
      icon: <GiWaterBottle className="text-2xl" />,
      title: "Snacks and water bottle",
      description: "Healthy snacks and a reusable water bottle to stay hydrated."
    },
    {
      icon: <FaChargingStation className="text-2xl" />,
      title: "Chargers",
      description: "For your phone and other electronics."
    },
    {
      icon: <FaPills className="text-2xl" />,
      title: "Pillows",
      description: "For extra comfort and support during recovery."
    }
  ];

  return (
    <>
      <Head>
        <title>What to pack for your post-op recovery house in Tijuana?</title>
        <meta name="description" content="Staying at a recovery house after your plastic surgery? We provide you with the must-haves to ensure a stress-free trip for you and your companion." />
        <link rel="canonical" href="https://www.palmasrecovery.com/what-to-pack-for-your-post-op-recovery-house-in-tijuana" />
        <meta name="keywords" content="Recovery, Tijuana, travel, traveling, post-op, packing, surgery, Palmas Recovery House" />
      </Head>
      <Navbar />
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#657251] hover:text-[#657251]/80 transition-colors group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">What to pack for your post-op recovery house?</h1>
        <p className="text-lg text-gray-700 mb-8">Traveling for a surgical procedure is a significant commitment to your health and aesthetic goals. At Palmas Recovery House, we understand that a seamless recovery begins long before you arrive in Tijuana.</p>
        <p className="text-lg text-gray-700 mb-8">To ensure a stress-free transition from the operating room to our care, in this blog, we will outline the essential must-haves for a stress-free trip to Tijuana.</p>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">Research Your Destination</h3>
        <p className="mb-6">Familiarize yourself with the area where your surgery will take place. Look into nearby accommodations, restaurants, and transportation options especially if you are traveling with a companion who wants to explore and get to know the city. At Palmas Recovery House, we provide recommendations based on your needs for a more comfortable experience.</p>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">I. Essential Documentation & Logistics</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Identification: A valid Passport and ID. Ensure you have secured a Visa if your country of origin requires one for entry into Mexico.</li>
          <li>Medical Records: Physical or digital copies of your surgical consultation notes, medical history, and emergency contact information.</li>
          <li>Insurance & Contact Details: Travel insurance documents (specifically medical coverage) and the direct contact information for your surgeon's office and the hospital.</li>
          <li>Financial Readiness: Carry local currency for minor expenditures. Notify your banking institution of your international travel to prevent security blocks on your credit or debit cards.</li>
        </ul>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">II. Functional Post-Operative Wardrobe</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Front-Opening Attire: Loose-fitting nightgowns, pajamas, or robes with buttons or zippers. Avoid "over-the-head" clothing during the initial stages of healing.</li>
          <li>Skin Protection: Soft cotton camisoles or tank tops as a gentle barrier between your skin and medical compression garments.</li>
          <li>Safety Footwear: Non-slip, "slip-on" shoes or slippers. Avoid footwear that requires bending or straining to put on.</li>
          <li>Circulatory Support: Compression stockings to manage swelling and support healthy circulation during travel and early recovery.</li>
        </ul>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">III. Personal Hygiene & Self-Care</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Travel-Sized Essentials: Shampoo, conditioner, and fragrance-free cleansers. Adhere to the 100ml limit for liquids if traveling with carry-on luggage.</li>
          <li>Hydration: Pack a high-quality lip balm or petroleum-based moisturizer.</li>
          <li>Minimal Effort Care: Dry shampoo and facial wipes (or micellar water) for easy hygiene and refreshment.</li>
        </ul>
        <p className="mb-8">Most of these items can be purchased in Tijuana if you prefer to travel light. However, you can also pack everything ahead of time if that helps you feel calmer!</p>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6">Discover Why PALMAS RECOVERY is Your Best Choice for Post-Op Travel</h2>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">IV. Facilities and Patient Experience at Palmas Recovery</h3>
        <p className="mb-6">Our facility bridges the gap between clinical excellence and residential comfort. Upon arrival, our nursing staff will assist with your intake and settle you into your private room.</p>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6">What sets us apart:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Clinical Supervision: You will be evaluated by Dr. Raul or Dr. Cecilia shortly after arrival to review your post-op instructions and address any clinical concerns.</li>
          <li>Specialized Nutrition: We provide a curated anti-inflammatory diet, high in lean protein, fiber, and complex carbohydrates to promote tissue repair and reduce recovery time.</li>
          <li>Connectivity: All suites are equipped with Smart TVs and High-Speed Wi-Fi for entertainment and communication.</li>
        </ul>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">V. Travel Companions & The Tijuana Experience</h3>
        <p className="mb-6">Tijuana is an exciting and vibrant city teeming with a diverse array of activities and services, making it the perfect destination for anyone seeking adventure and new experiences. While you recover, your companion may explore:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Culture: The Tijuana Cultural Center (CECUT) or the historic Avenida Revolución.</li>
          <li>Gastronomy: Enjoy Mexican, Mediterranean, Asian cuisines, artisanal beers, and local fine wines.</li>
          <li>Leisure: Premium shopping centers, Club Campestre for golf, and Xolos stadium for soccer fans.</li>
        </ul>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-12 mb-6">How long should you stay at a recovery house before it is safe to fly back home?</h1>
        <h3 className="text-2xl font-bold text-[#657251] mt-10 mb-4">VI. Safety Protocol: The Journey Home</h3>
        <p className="mb-8">Patient safety is our absolute priority. We generally advise a stay of 7 to 14 days before it is medically safe to fly. Air travel too soon after surgery carries risks such as deep vein thrombosis (DVT) and increased edema. We will work in direct coordination with your surgeon to determine your specific "fit-to-fly" timeline.</p>
        <p className="mb-8">Ready to start your journey? At Palmas Recovery, we combine professional medical expertise with the warmth of a home. We're here to make sure your aesthetic goals are met with peace of mind.</p>
        
        {/* Blog Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <Link href="/blog/blog3" className="group inline-flex items-center gap-3 text-[#657251] hover:text-[#657251]/80 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#657251] group-hover:bg-[#657251]/10 transition">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Article</p>
                  <p className="font-semibold">Recovery House vs. Hotel</p>
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/blog/blog2" className="group inline-flex items-center gap-3 text-[#657251] hover:text-[#657251]/80 transition-colors">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Next Article</p>
                  <p className="font-semibold">Ideal Weather for Surgery</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#657251] group-hover:bg-[#657251]/10 transition rotate-180">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 text-[#657251] hover:text-[#657251]/80 transition-colors border border-[#657251] rounded-full hover:bg-[#657251]/5">
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