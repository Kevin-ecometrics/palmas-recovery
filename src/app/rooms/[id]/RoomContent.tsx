import { Room } from "../rooms.data";
import {
  FaUsers,
  FaBed,
  FaShieldAlt,
  FaUtensils,
  FaTv,
  FaWind,
  FaBath,
  FaKey,
  FaStar,
} from "react-icons/fa";
import {
  MdZoomOutMap,
  MdLocalHospital,
  MdCleaningServices,
  MdPrivacyTip,
} from "react-icons/md";
import { GiMedicalPack } from "react-icons/gi";

type Props = {
  room: Room;
};

export default function RoomContent({ room }: Props) {
  // Mapeo de íconos para amenities
  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("Medical"))
      return <GiMedicalPack className="text-principal text-lg" />;
    if (amenity.includes("Bathroom"))
      return <FaBath className="text-principal text-lg" />;
    if (amenity.includes("Air Conditioning"))
      return <FaWind className="text-principal text-lg" />;
    if (amenity.includes("TV"))
      return <FaTv className="text-principal text-lg" />;
    if (amenity.includes("Private Entrance"))
      return <FaKey className="text-principal text-lg" />;
    return <FaStar className="text-principal text-lg" />;
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={room.image}
            alt={room.imageAlt}
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 h-full flex items-end pb-20">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-principal/20 backdrop-blur-sm border border-principal/30 text-principal px-6 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-principal rounded-full animate-pulse" />
                <span className="font-bold tracking-widest text-sm uppercase">
                  {room.subtitle}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-7xl md:text-8xl font-serif font-bold text-white mb-4 leading-tight">
                {room.name}
              </h1>

              {/* Tagline */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-white/50" />
                <p className="text-2xl text-white/90 italic font-light">
                  {room.tagline}
                </p>
                <div className="w-16 h-px bg-white/50" />
              </div>

              {/* Description */}
              <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                {room.description}
              </p>

              {/* Price in Hero */}
              <div className="mt-10 p-6 bg-white/10 backdrop-blur-sm rounded-2xl inline-block border border-white/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    ${room.price}
                  </span>
                  <span className="text-white/70">/ night</span>
                </div>
                <p className="text-sm text-white/60 mt-1">
                  All inclusive • No hidden fees
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* DETAILS CARD */}
            <div className="lg:col-span-2 space-y-12">
              {/* Room Specifications */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px bg-principal" />
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    Room Specifications
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="p-3 bg-principal/10 rounded-xl group-hover:scale-110 transition-transform">
                        <FaBed className="text-principal text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bed Type</p>
                        <p className="text-lg font-semibold">{room.beds}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="p-3 bg-principal/10 rounded-xl group-hover:scale-110 transition-transform">
                        <MdZoomOutMap className="text-principal text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Room Size</p>
                        <p className="text-lg font-semibold">{room.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="p-3 bg-principal/10 rounded-xl group-hover:scale-110 transition-transform">
                        <FaUsers className="text-principal text-2xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Capacity</p>
                        <p className="text-lg font-semibold">
                          Up to {room.capacity} guest
                          {room.capacity > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Medical Features */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <MdLocalHospital className="text-principal" />
                        Medical Features
                      </h3>
                      <div className="space-y-3">
                        {room.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <div className="w-2 h-2 bg-principal rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Amenities */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px bg-principal" />
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    Premium Amenities
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {room.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                    >
                      <div className="p-3 bg-principal/10 rounded-lg group-hover:bg-principal/20 transition-colors">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOOKING CARD */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-b from-white to-gray-50 p-10 rounded-3xl shadow-2xl border border-gray-200">
                {/* Price Highlight */}
                <div className="text-center mb-8">
                  <p className="text-sm text-gray-500 mb-2">Starting from</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-bold text-gray-900">
                      ${room.price}
                    </span>
                    <span className="text-gray-600 text-lg">/ night</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Taxes & services included
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaShieldAlt className="text-principal" />
                    <span className="text-sm">24/7 Medical Assistance</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaUtensils className="text-principal" />
                    <span className="text-sm">All Meals Included</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MdCleaningServices className="text-principal" />
                    <span className="text-sm">Daily Professional Cleaning</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MdPrivacyTip className="text-principal" />
                    <span className="text-sm">Complete Privacy & Security</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="group/btn relative w-full bg-black text-white font-bold py-5 overflow-hidden transition-all hover:shadow-2xl rounded-full mb-6">
                  <span className="relative z-10 tracking-wider text-lg">
                    BOOK THIS ROOM
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-principal to-principal transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 rounded-full" />
                </button>

                {/* Additional Info */}
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-500">
                    ⚡ Instant confirmation
                  </p>
                  <p className="text-sm text-gray-500">🔒 Secure booking</p>
                  <p className="text-sm text-gray-500">
                    🏆 Best price guaranteed
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400">
                      Need help?{" "}
                      <a
                        href="/contact"
                        className="text-principal font-semibold hover:underline"
                      >
                        Contact our team
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="bg-gradient-to-r from-principal/10 to-principal/5 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Ready to begin your recovery journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience world-class post-surgical care in an environment designed
            for healing and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-12 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-all shadow-lg">
              Book Now
            </button>
            <button className="px-12 py-4 border-2 border-gray-300 text-gray-800 font-bold rounded-full hover:border-black hover:bg-white transition-all">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
