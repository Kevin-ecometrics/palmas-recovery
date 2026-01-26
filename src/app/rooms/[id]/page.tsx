import { notFound } from "next/navigation";
import Link from "next/link";
import { ROOMS } from "../rooms.data";
import RoomContent from "./RoomContent";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";

export async function generateStaticParams() {
  return ROOMS.map((room) => ({
    id: room.id,
  }));
}

type PageProps = {
  params: {
    id: string;
  };
};

export default function RoomPage({ params }: PageProps) {
  const room = ROOMS.find((r) => r.id === params.id);

  if (!room) notFound();

  const otherRooms = ROOMS.filter((r) => r.id !== room.id);

  return (
    <section className="min-h-screen bg-white">
      <RoomContent room={room} />

      {/* RECOMMENDED ROOMS */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-principal/10 text-principal px-6 py-2 rounded-full mb-6">
              <span className="font-bold tracking-widest text-sm uppercase">
                EXPLORE MORE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Discover Our Other Luxury Suites
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Each space is uniquely designed to provide the perfect environment
              for your recovery journey.
            </p>
          </div>

          {/* Room Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherRooms.map((otherRoom) => (
              <Link
                key={otherRoom.id}
                href={`/rooms/${otherRoom.id}`}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={otherRoom.image}
                      alt={otherRoom.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-principal text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                        {otherRoom.highlight}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-principal tracking-wider uppercase">
                        {otherRoom.subtitle}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          ${otherRoom.price}
                        </span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                      {otherRoom.name}
                    </h3>
                    <p className="text-gray-600 italic mb-4">
                      {otherRoom.tagline}
                    </p>

                    {/* Quick Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-xs" />
                        <span>
                          {otherRoom.capacity} guest
                          {otherRoom.capacity > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdZoomOutMap className="text-xs" />
                        <span>{otherRoom.size}</span>
                      </div>
                    </div>

                    {/* Amenities Preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {otherRoom.amenities.slice(0, 2).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {otherRoom.amenities.length > 2 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{otherRoom.amenities.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* CTA Arrow */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                      <span className="text-gray-700 font-medium">
                        View Details
                      </span>
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-principal transition-colors group-hover:translate-x-2 duration-300">
                        <FaArrowLeft className="transform rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to All Rooms */}
          <div className="text-center mt-16">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-800 font-bold rounded-full hover:border-black hover:bg-gray-50 transition-all group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              View All Rooms
              <span className="text-gray-400 group-hover:text-black">
                ({ROOMS.length} total)
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
