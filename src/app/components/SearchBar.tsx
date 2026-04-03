"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaUsers,
  FaUser,
  FaCrown,
  FaSearch,
  FaChevronDown,
  FaBed,
  FaDoorOpen,
  FaMinus,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  floating: boolean;
  hidden?: boolean;
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
}

function Divider() {
  return <div className="hidden md:block h-8 w-px bg-white/15 self-center" />;
}

// ─── Section button ───────────────────────────────────────────────────────────

interface SectionButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  isActive: boolean;
  onClick: () => void;
}

function SectionButton({
  icon,
  label,
  value,
  subValue,
  isActive,
  onClick,
}: SectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-3 px-5 py-4 text-left w-full md:w-auto
        rounded-lg transition-all duration-200 group focus:outline-none
        ${isActive ? "bg-white/10" : "hover:bg-white/8"}
      `}
    >
      <span
        className={`shrink-0 transition-colors ${
          isActive ? "text-white" : "text-white group-hover:text-white"
        }`}
      >
        {icon}
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase tracking-widest font-medium text-white leading-none mb-1">
          {label}
        </span>
        <span className="text-sm font-medium text-white leading-tight truncate">
          {value}
        </span>
        {subValue && (
          <span className="text-[11px] text-white mt-0.5 leading-none">
            {subValue}
          </span>
        )}
      </span>
      <FaChevronDown
        size={9}
        className={`shrink-0 ml-auto text-white transition-transform duration-200 ${
          isActive ? "rotate-180 text-white" : ""
        }`}
      />
    </button>
  );
}

// ─── Dropdown shell ───────────────────────────────────────────────────────────

function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        absolute bottom-full left-0 mb-3 z-50
        bg-white rounded-2xl shadow-2xl border border-gray-100
        overflow-hidden
      "
      style={{ animation: "dropUp 0.14s ease-out" }}
    >
      {children}
      <style>{`
        @keyframes dropUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Room type dropdown ───────────────────────────────────────────────────────

const ROOM_ICONS: Record<string, React.ReactNode> = {
  shared: <FaUsers size={14} />,
  private: <FaUser size={13} />,
  vip: <FaCrown size={12} />,
};

function RoomDropdown({
  rooms,
  selected,
  onChange,
}: {
  rooms: RoomType[];
  selected: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="p-3 w-[270px]">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium px-1 mb-2">
        Room type
      </p>
      <div className="flex flex-col gap-0.5">
        {rooms.map((room) => {
          const active = selected === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onChange(room.id)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                transition-all duration-150
                ${active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"}
              `}
            >
              <span
                className={`shrink-0 ${active ? "text-white" : "text-gray-400"}`}
              >
                {ROOM_ICONS[room.type] ?? <FaBed size={13} />}
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className={`block text-sm font-medium leading-tight ${active ? "text-white" : "text-gray-800"}`}
                >
                  {room.name}
                </span>
                <span
                  className={`block text-xs mt-0.5 leading-tight ${active ? "text-white" : "text-gray-400"}`}
                >
                  {room.description}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span
                  className={`block text-sm font-semibold ${active ? "text-white" : "text-gray-800"}`}
                >
                  ${room.price}
                </span>
                <span
                  className={`block text-[10px] ${active ? "text-white" : "text-gray-400"}`}
                >
                  /night
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Guests dropdown ──────────────────────────────────────────────────────────

function GuestsDropdown({
  guests,
  max,
  onChange,
}: {
  guests: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="p-5 w-[230px]">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-4">
        Guests
      </p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-semibold text-gray-900">{guests}</span>
          <span className="text-sm text-gray-400 ml-1.5">
            {guests === 1 ? "guest" : "guests"}
          </span>
          <p className="text-xs text-gray-400 mt-0.5">Max {max}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onChange(Math.max(0, guests - 1))} // Cambiado de 1 a 0
            disabled={guests <= 0} // Cambiado de 1 a 0
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <FaMinus size={8} />
          </button>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, guests + 1))}
            disabled={guests >= max}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <FaPlus size={8} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Duration dropdown ────────────────────────────────────────────────────────

const DURATIONS = [
  { nights: "1", label: "1n" },
  { nights: "2", label: "2n" },
  { nights: "3", label: "3n" },
  { nights: "5", label: "5n" },
  { nights: "7", label: "7n" },
  { nights: "14", label: "14n" },
  { nights: "30", label: "30n" },
];

function DurationDropdown({
  duration,
  pricePerNight,
  onChange,
}: {
  duration: string;
  pricePerNight: number;
  onChange: (d: string) => void;
}) {
  return (
    <div className="p-4 w-[240px]">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-3">
        Duration
      </p>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {DURATIONS.map((d) => (
          <button
            key={d.nights}
            type="button"
            onClick={() => onChange(d.nights)}
            className={`
              py-2 rounded-lg text-xs font-medium transition-all text-center
              ${
                duration === d.nights
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {d.label}
          </button>
        ))}
      </div>
      {pricePerNight > 0 && (
        <div className="pt-3 border-t border-gray-100 flex justify-between text-xs">
          <span className="text-gray-400">Total</span>
          <span className="font-semibold text-gray-800">
            ${pricePerNight * parseInt(duration)}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Promo dropdown ───────────────────────────────────────────────────────────

function PromoDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="p-4 w-[230px]">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-3">
        Promo code
      </p>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="ENTER CODE"
          autoFocus
          className="
            w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-8
            text-sm font-mono tracking-widest text-gray-800
            placeholder-gray-300 focus:outline-none focus:border-gray-400
            transition-colors
          "
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <FaTimes size={10} />
          </button>
        )}
      </div>
      <p className="text-[11px] text-gray-400 mt-2">
        Save up to 20% with a valid code
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SearchBar({ floating, hidden = false }: Props) {
  const { t } = useTranslation();

  const roomTypes: RoomType[] = [
    {
      id: "shared",
      name: t("rooms.shared.name"),
      type: "shared",
      price: 170,
      description: t("rooms.shared.tagline"),
      capacity: 4,
      beds: t("rooms.shared.beds"),
      bathroom: "shared",
      amenities: t("rooms.shared.amenities", {
        returnObjects: true,
      }) as string[],
      tag: t("rooms.shared.tag"),
      tagColor: "bg-blue-500",
    },
    {
      id: "private",
      name: t("rooms.private.name"),
      type: "private",
      price: 180,
      description: t("rooms.private.tagline"),
      capacity: 1,
      beds: t("rooms.private.beds"),
      bathroom: "private",
      amenities: t("rooms.private.amenities", {
        returnObjects: true,
      }) as string[],
      tag: t("rooms.private.tag"),
      tagColor: "bg-green-500",
    },
    {
      id: "vip",
      name: t("rooms.vip.name"),
      type: "vip",
      price: 200,
      description: t("rooms.vip.tagline"),
      capacity: 1,
      beds: t("rooms.vip.beds"),
      bathroom: "private",
      amenities: t("rooms.vip.amenities", { returnObjects: true }) as string[],
      tag: t("rooms.vip.tag"),
      tagColor: "bg-purple-500",
    },
  ];

  const [filters, setFilters] = useState<SearchFilters>({
    roomType: "shared",
    guests: 0,
    duration: "3",
    promoCode: "",
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  useOutsideClick(barRef as React.RefObject<HTMLElement>, () =>
    setActiveFilter(null),
  );

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    if (key === "roomType") {
      const newRoom = roomTypes.find((r) => r.id === value);
      setFilters((prev) => ({
        ...prev,
        roomType: value,
      }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const toggle = (name: string) =>
    setActiveFilter((prev) => (prev === name ? null : name));

  const handleSearch = () => {
    const params = new URLSearchParams({
      room: filters.roomType,
      guests: filters.guests.toString(),
      duration: filters.duration,
      promo: filters.promoCode,
    });
    window.location.href = `/search-results?${params.toString()}`;
    setActiveFilter(null);
  };

  const selectedRoom = roomTypes.find((r) => r.id === filters.roomType);

  return (
    <div
      ref={barRef}
      className={`
        transition-all duration-700 ease-out
        ${
          floating
            ? "fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
            : "absolute bottom-12 right-6 md:right-12 z-20"
        }
        ${hidden ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
      `}
    >
      <div
        className={`
          relative bg-wine text-white backdrop-blur-xl
          border border-white/20 rounded-2xl shadow-2xl
          w-[92vw] max-w-full md:w-auto overflow-visible
          ${floating ? "md:max-w-5xl" : "md:max-w-5xl"}
        `}
      >
        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden w-full px-5 py-3.5 flex items-center justify-between text-white"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <FaSearch size={12} />
            {t("common.bookNow")}
          </span>
          <FaChevronDown
            size={11}
            className={`text-white transition-transform duration-300 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Filter row */}
        <div
          className={`
            flex flex-col md:flex-row md:items-stretch overflow-visible
            transition-all duration-500
            ${
              mobileOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 md:max-h-none opacity-0 md:opacity-100 overflow-hidden md:overflow-visible"
            }
          `}
        >
          {/* Room type */}
          <div className="relative">
            <SectionButton
              icon={ROOM_ICONS[filters.roomType] ?? <FaBed size={16} />}
              label={t("searchBar.roomType")}
              value={selectedRoom?.name ?? t("searchBar.selectRoom")}
              subValue={
                selectedRoom ? `$${selectedRoom.price} / night` : undefined
              }
              isActive={activeFilter === "roomType"}
              onClick={() => toggle("roomType")}
            />
            {activeFilter === "roomType" && (
              <Dropdown>
                <RoomDropdown
                  rooms={roomTypes}
                  selected={filters.roomType}
                  onChange={(v) => {
                    handleFilterChange("roomType", v);
                    setActiveFilter(null);
                  }}
                />
              </Dropdown>
            )}
          </div>

          <Divider />

          {/* Guests */}
          <div className="relative">
            <SectionButton
              icon={<FaUser size={14} />}
              label={t("searchBar.guests")}
              value={`${filters.guests} ${t("common.guest", { count: filters.guests })}`}
              subValue={t("searchBar.maxGuests", {
                count: selectedRoom?.capacity ?? 1,
              })}
              isActive={activeFilter === "guests"}
              onClick={() => toggle("guests")}
            />
            {activeFilter === "guests" && (
              <Dropdown>
                <GuestsDropdown
                  guests={filters.guests}
                  max={selectedRoom?.capacity ?? 1}
                  onChange={(v) => handleFilterChange("guests", v)}
                />
              </Dropdown>
            )}
          </div>

          <Divider />

          {/* Duration */}
          <div className="relative">
            <SectionButton
              icon={<FaDoorOpen size={15} />}
              label={t("searchBar.stayDuration")}
              value={`${filters.duration} ${t("common.night", { count: Number(filters.duration) })}`}
              subValue={
                selectedRoom
                  ? t("searchBar.totalWithValue", {
                      value: selectedRoom.price * parseInt(filters.duration),
                    })
                  : undefined
              }
              isActive={activeFilter === "duration"}
              onClick={() => toggle("duration")}
            />
            {activeFilter === "duration" && (
              <Dropdown>
                <DurationDropdown
                  duration={filters.duration}
                  pricePerNight={selectedRoom?.price ?? 0}
                  onChange={(v) => {
                    handleFilterChange("duration", v);
                    setActiveFilter(null);
                  }}
                />
              </Dropdown>
            )}
          </div>

          <Divider />

          {/* Promo */}
          <div className="relative">
            <SectionButton
              icon={<FaCrown size={12} />}
              label={t("searchBar.promotion")}
              value={filters.promoCode || t("searchBar.addCode")}
              subValue={t("searchBar.saveUpTo", { percent: 20 })}
              isActive={activeFilter === "promo"}
              onClick={() => toggle("promo")}
            />
            {activeFilter === "promo" && (
              <Dropdown>
                <PromoDropdown
                  value={filters.promoCode}
                  onChange={(v) => handleFilterChange("promoCode", v)}
                />
              </Dropdown>
            )}
          </div>

          {/* CTA */}
          <div className="px-3 py-3 flex items-center shrink-0">
            <button
              type="button"
              onClick={handleSearch}
              className="
                bg-white text-gray-900 font-semibold text-sm
                px-6 py-3 rounded-xl w-full md:w-auto
                flex items-center justify-center gap-2
                hover:bg-gray-100 active:scale-95
                transition-all duration-150 shadow-lg whitespace-nowrap
              "
            >
              <FaSearch size={11} />
              {t("common.bookNowUpper")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
