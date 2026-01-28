"use client";

import { useState } from "react";
import {
  FaUsers,
  FaUser,
  FaCrown,
  FaSearch,
  FaChevronDown,
  FaBed,
  FaDoorOpen,
  FaBath,
  FaTv,
  FaWind,
} from "react-icons/fa";

interface Props {
  floating: boolean;
}

interface RoomType {
  id: string;
  name: string;
  type: "shared" | "private" | "vip";
  price: number;
  description: string;
  capacity: number;
  beds: string;
  bathroom: "shared" | "private";
  amenities: string[];
  tag?: string;
  tagColor?: string;
}

interface SearchFilters {
  roomType: string;
  guests: number;
  duration: string;
  promoCode: string;
}

export default function SearchBar({ floating }: Props) {
  const roomTypes: RoomType[] = [
    {
      id: "shared",
      name: "Shared Room",
      type: "shared",
      price: 150,
      description: "Comfortable & Affordable",
      capacity: 4,
      beds: "Adjustable Medical Bed",
      bathroom: "shared",
      amenities: ["Air Conditioning", "Smart TV", "Shared Bathroom"],
      tag: "POPULAR",
      tagColor: "bg-blue-500",
    },
    {
      id: "private",
      name: "Private Room",
      type: "private",
      price: 180,
      description: "Your Personal Sanctuary",
      capacity: 1,
      beds: "Adjustable Medical Bed",
      bathroom: "private",
      amenities: ["Private Bathroom", "Air Conditioning", "Smart TV"],
      tag: "RECOMMENDED",
      tagColor: "bg-green-500",
    },
    {
      id: "vip",
      name: "VIP Suite",
      type: "vip",
      price: 200,
      description: "The Ultimate Luxury Experience",
      capacity: 1,
      beds: "Premium Adjustable Medical Bed",
      bathroom: "private",
      amenities: [
        "Private Bathroom",
        "Private Entrance with Terrace",
        "Air Conditioning",
        "Smart TV",
      ],
      tag: "PREMIUM",
      tagColor: "bg-purple-500",
    },
  ];

  const [filters, setFilters] = useState<SearchFilters>({
    roomType: "shared",
    guests: 1,
    duration: "3 nights",
    promoCode: "",
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const selectedRoom = roomTypes.find((room) => room.id === filters.roomType);
    console.log("Searching with filters:", {
      ...filters,
      roomDetails: selectedRoom,
      totalPrice: selectedRoom
        ? selectedRoom.price * parseInt(filters.duration)
        : 0,
    });
    // Aquí implementarías la lógica de búsqueda/reserva
    setActiveFilter(null);
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "shared":
        return <FaUsers size={18} />;
      case "private":
        return <FaUser size={18} />;
      case "vip":
        return <FaCrown size={18} />;
      default:
        return <FaBed size={18} />;
    }
  };

  const selectedRoom = roomTypes.find((room) => room.id === filters.roomType);

  return (
    <>
      <div
        className={`
          transition-all duration-700 ease-out
          ${
            floating
              ? "fixed bottom-8 left-1/2 -translate-x-1/2 z-40 scale-95"
              : "absolute bottom-12 right-6 md:right-12 z-20"
          }
        `}
      >
        <div
          className={`
            flex items-center
            bg-white rounded-xl shadow-xl
            border border-gray-200
            backdrop-blur-md
            overflow-hidden
            ${floating ? "max-w-5xl" : "max-w-6xl"}
          `}
        >
          {/* Room Type Filter */}
          <FilterButton
            icon={getRoomIcon(filters.roomType)}
            label="Room Type"
            value={selectedRoom?.name || "Select Room"}
            subValue={`$${selectedRoom?.price}/night`}
            isActive={activeFilter === "roomType"}
            onClick={() =>
              setActiveFilter(activeFilter === "roomType" ? null : "roomType")
            }
          />

          <Divider />

          {/* Guests Filter */}
          <FilterButton
            icon={<FaUser size={16} />}
            label="Guests"
            value={`${filters.guests} guest${filters.guests > 1 ? "s" : ""}`}
            subValue={`Max: ${selectedRoom?.capacity || 1}`}
            isActive={activeFilter === "guests"}
            onClick={() =>
              setActiveFilter(activeFilter === "guests" ? null : "guests")
            }
          />

          <Divider />

          {/* Duration Filter */}
          <FilterButton
            icon={<FaDoorOpen size={16} />}
            label="Stay Duration"
            value={filters.duration}
            subValue={`Total: $${
              selectedRoom ? selectedRoom.price * parseInt(filters.duration) : 0
            }`}
            isActive={activeFilter === "duration"}
            onClick={() =>
              setActiveFilter(activeFilter === "duration" ? null : "duration")
            }
          />

          <Divider />

          {/* Promo Filter */}
          <FilterButton
            icon={<FaCrown size={14} />}
            label="Promotion"
            value={filters.promoCode || "Add code"}
            subValue="Save up to 20%"
            isActive={activeFilter === "promo"}
            onClick={() =>
              setActiveFilter(activeFilter === "promo" ? null : "promo")
            }
          />

          {/* Search/Book Button */}
          <div className="px-4">
            <button
              onClick={handleSearch}
              className="
                bg-gradient-to-r from-[#e56b5c] to-[#d65f51]
                text-white
                px-8
                py-3
                rounded-lg
                font-medium
                hover:from-[#d65f51] hover:to-[#c55345]
                transition-all
                whitespace-nowrap
                flex items-center gap-2
                shadow-lg hover:shadow-xl
              "
            >
              <FaSearch />
              BOOK NOW
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panels */}
      {activeFilter && (
        <div
          className="fixed inset-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setActiveFilter(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: activeFilter === "roomType" ? "800px" : "500px",
            }}
          >
            {activeFilter === "roomType" && (
              <RoomTypeFilter
                rooms={roomTypes}
                selectedRoom={filters.roomType}
                onChange={(value) => handleFilterChange("roomType", value)}
                onClose={() => setActiveFilter(null)}
              />
            )}

            {activeFilter === "guests" && (
              <GuestsFilter
                guests={filters.guests}
                maxGuests={selectedRoom?.capacity || 1}
                onChange={(value) => handleFilterChange("guests", value)}
                onClose={() => setActiveFilter(null)}
              />
            )}

            {activeFilter === "duration" && (
              <DurationFilter
                duration={filters.duration}
                pricePerNight={selectedRoom?.price || 0}
                onChange={(value) => handleFilterChange("duration", value)}
                onClose={() => setActiveFilter(null)}
              />
            )}

            {activeFilter === "promo" && (
              <PromoFilter
                value={filters.promoCode}
                onChange={(value) => handleFilterChange("promoCode", value)}
                onClose={() => setActiveFilter(null)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({
  icon,
  label,
  value,
  subValue,
  isActive,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-3
        px-6 py-4
        min-w-[180px]
        text-left
        hover:bg-gray-50
        transition-all
        focus:outline-none
        focus:bg-gray-100
        cursor-pointer
        ${isActive ? "bg-gray-50 border-r-2 border-[#e56b5c]" : ""}
      `}
    >
      <div className="text-gray-600 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
        {subValue && (
          <p className="text-xs text-gray-600 truncate">{subValue}</p>
        )}
      </div>
      <FaChevronDown className="text-gray-400 flex-shrink-0" size={12} />
    </button>
  );
}

interface RoomTypeFilterProps {
  rooms: RoomType[];
  selectedRoom: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

function RoomTypeFilter({
  rooms,
  selectedRoom,
  onChange,
  onClose,
}: RoomTypeFilterProps) {
  const [selected, setSelected] = useState(selectedRoom);

  return (
    <FilterPanel title="Select Your Room Type" onClose={onClose}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelected(room.id)}
              className={`
                border-2 rounded-xl p-4 text-left transition-all
                ${
                  selected === room.id
                    ? "border-[#e56b5c] bg-red-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {/* Room Tag */}
              {room.tag && (
                <div
                  className={`${room.tagColor} text-white text-xs font-bold px-2 py-1 rounded-full inline-flex items-center gap-1 mb-3`}
                >
                  {room.tag === "PREMIUM" && <FaCrown size={10} />}
                  {room.tag === "RECOMMENDED" && <FaUser size={10} />}
                  {room.tag === "POPULAR" && <FaUsers size={10} />}
                  {room.tag}
                </div>
              )}

              {/* Room Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-lg">{room.name}</h4>
                  <p className="text-sm text-gray-600">{room.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#e56b5c]">
                    ${room.price}
                  </div>
                  <div className="text-xs text-gray-500">/ night</div>
                </div>
              </div>

              {/* Room Details */}
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaBed className="text-gray-400" />
                  <span>{room.beds}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaUser className="text-gray-400" />
                  <span>
                    Accommodates up to {room.capacity} guest
                    {room.capacity > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaBath className="text-gray-400" />
                  <span className="capitalize">{room.bathroom} Bathroom</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Luxury Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onChange(selected);
              onClose();
            }}
            className="px-6 py-2 bg-[#e56b5c] text-white rounded-lg font-medium hover:bg-[#d65f51] transition"
          >
            Select Room
          </button>
        </div>
      </div>
    </FilterPanel>
  );
}

interface GuestsFilterProps {
  guests: number;
  maxGuests: number;
  onChange: (value: number) => void;
  onClose: () => void;
}

function GuestsFilter({
  guests,
  maxGuests,
  onChange,
  onClose,
}: GuestsFilterProps) {
  return (
    <FilterPanel title="Number of Guests" onClose={onClose}>
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-[#e56b5c] mb-2">{guests}</div>
          <p className="text-gray-600">guest{guests > 1 ? "s" : ""}</p>
          <p className="text-sm text-gray-500 mt-2">
            Maximum capacity: {maxGuests} guest{maxGuests > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => onChange(Math.max(1, guests - 1))}
            disabled={guests <= 1}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <div className="text-3xl font-bold">{guests}</div>
          <button
            onClick={() => onChange(Math.min(maxGuests, guests + 1))}
            disabled={guests >= maxGuests}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-2xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> For shared rooms, additional guests may be
            placed with other patients in recovery.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#e56b5c] text-white py-3 rounded-lg font-medium hover:bg-[#d65f51] transition"
        >
          Confirm Guests
        </button>
      </div>
    </FilterPanel>
  );
}

interface DurationFilterProps {
  duration: string;
  pricePerNight: number;
  onChange: (value: string) => void;
  onClose: () => void;
}

function DurationFilter({
  duration,
  pricePerNight,
  onChange,
  onClose,
}: DurationFilterProps) {
  const durations = [
    { nights: "1", label: "1 night", total: pricePerNight },
    {
      nights: "3",
      label: "3 nights",
      total: pricePerNight * 3,
      recommended: true,
    },
    { nights: "7", label: "1 week", total: pricePerNight * 7 },
    { nights: "14", label: "2 weeks", total: pricePerNight * 14, discount: 10 },
    { nights: "30", label: "1 month", total: pricePerNight * 30, discount: 15 },
  ];

  const [selectedNights, setSelectedNights] = useState(duration.split(" ")[0]);

  return (
    <FilterPanel title="Select Stay Duration" onClose={onClose}>
      <div className="p-6">
        <div className="mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-800">
              ${pricePerNight}
            </div>
            <div className="text-sm text-gray-500">per night</div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <input
              type="range"
              min="1"
              max="30"
              value={selectedNights}
              onChange={(e) => setSelectedNights(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-lg font-bold min-w-[40px] text-center">
              {selectedNights}
            </div>
            <span className="text-gray-600">nights</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {durations.map((item) => (
            <button
              key={item.nights}
              onClick={() => setSelectedNights(item.nights)}
              className={`
                border-2 rounded-lg p-4 text-center transition-all
                ${
                  selectedNights === item.nights
                    ? "border-[#e56b5c] bg-red-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {item.recommended && (
                <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full inline-flex items-center gap-1 mb-2">
                  <FaUser size={8} />
                  RECOMMENDED
                </div>
              )}
              {item.discount && (
                <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full mb-2">
                  SAVE {item.discount}%
                </div>
              )}
              <div className="font-bold text-lg">{item.label}</div>
              <div className="text-2xl font-bold text-[#e56b5c] mt-1">
                ${item.total}
              </div>
              <div className="text-xs text-gray-500">total</div>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Price per night:</span>
            <span className="font-medium">${pricePerNight}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Nights:</span>
            <span className="font-medium">{selectedNights}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
            <span>Total:</span>
            <span className="text-[#e56b5c]">
              ${pricePerNight * parseInt(selectedNights)}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onChange(`${selectedNights} nights`);
              onClose();
            }}
            className="flex-1 bg-[#e56b5c] text-white py-3 rounded-lg font-medium hover:bg-[#d65f51] transition"
          >
            Confirm Stay
          </button>
        </div>
      </div>
    </FilterPanel>
  );
}

interface PromoFilterProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

function PromoFilter({ value, onChange, onClose }: PromoFilterProps) {
  const [code, setCode] = useState(value);
  const promoExamples = ["RECOVERY20", "HEALTH15", "WELCOME10"];

  return (
    <FilterPanel title="Apply Promotion Code" onClose={onClose}>
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 text-center">
          <FaCrown className="text-yellow-500 text-3xl mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1">Special Recovery Discounts</h4>
          <p className="text-gray-600 text-sm">
            Apply a code for exclusive savings on medical recovery stays
          </p>
        </div>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter promo code"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#e56b5c] text-center text-lg font-medium tracking-wider"
          maxLength={15}
        />

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Available Codes
          </p>
          <div className="flex flex-col gap-2">
            {promoExamples.map((promo) => (
              <button
                key={promo}
                onClick={() => setCode(promo)}
                className="flex justify-between items-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <div>
                  <div className="font-medium">{promo}</div>
                  <div className="text-xs text-gray-500">
                    {promo === "RECOVERY20" && "20% off all stays"}
                    {promo === "HEALTH15" && "15% off for healthcare workers"}
                    {promo === "WELCOME10" && "10% off first booking"}
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                  APPLY
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => {
              onChange("");
              setCode("");
            }}
            className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Clear Code
          </button>
          <button
            onClick={() => {
              onChange(code);
              onClose();
            }}
            className="flex-1 bg-gradient-to-r from-[#e56b5c] to-[#d65f51] text-white py-3 rounded-lg font-medium hover:from-[#d65f51] hover:to-[#c55345] transition"
          >
            Apply Discount
          </button>
        </div>
      </div>
    </FilterPanel>
  );
}

interface FilterPanelProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function FilterPanel({ title, children, onClose }: FilterPanelProps) {
  return (
    <>
      <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>
      {children}
    </>
  );
}

function Divider() {
  return <div className="h-10 w-px bg-gray-200" />;
}
