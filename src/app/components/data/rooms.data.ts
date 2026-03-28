export type Room = {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number | null;
  capacity: number | null;
  beds: string;
  size: string;
  amenities: string[];
  features: string[];
  highlight: string;
};

export const ROOMS: Room[] = [
  {
    id: "lobby",
    name: "Lobby",
    subtitle: "WELCOME",
    tagline: "Your Arrival Experience",
    description:
      "Step into our welcoming lobby, designed to provide comfort and tranquility from the moment you arrive. A space where hospitality meets healing.",
    image: "/lobby.jpg",
    imageAlt: "Hotel Lobby",
    price: null,
    capacity: null,
    beds: "N/A",
    size: "Common Area",
    amenities: [
      "Reception Desk",
      "Comfortable Seating",
      "Welcome Drinks",
      "Wi-Fi",
      "Information Desk",
    ],
    features: ["24/7 Reception", "Concierge Service", "Guest Relations"],
    highlight: "WELCOME",
  },
  {
    id: "shared",
    name: "Shared Room",
    subtitle: "POPULAR",
    tagline: "Comfortable & Affordable",
    description:
      "Experience exceptional care in a shared space designed for comfort and connection. Ideal for guests seeking professional recovery services.",
    image: "/habitacion_compartida.jpg",
    imageAlt: "Shared Room",
    price: 170,
    capacity: 4,
    beds: "Adjustable Medical Bed",
    size: "Shared Space",
    amenities: [
      "Adjustable Medical Bed",
      "Shared Bathroom",
      "Air Conditioning",
      "Smart TV",
    ],
    features: [
      "24/7 Medical Assistance",
      "Daily Cleaning",
      "All Meals Included",
    ],
    highlight: "POPULAR",
  },
  {
    id: "private",
    name: "Private Room",
    subtitle: "RECOMMENDED",
    tagline: "Your Personal Sanctuary",
    description:
      "Find tranquility and privacy in your own recovery space. Our private rooms offer modern medical comfort.",
    imageAlt: "Private Room",
        image: "/habitacion_vip.jpg",

    price: 180,
    capacity: 1,
    beds: "Adjustable Medical Bed",
    size: "Private Room",
    amenities: [
      "Adjustable Medical Bed",
      "Private Bathroom",
      "Air Conditioning",
      "Smart TV",
    ],
    features: ["Full Privacy", "Personalized Attention"],
    highlight: "RECOMMENDED",
  },
  {
    id: "vip",
    name: "VIP Suite",
    subtitle: "PREMIUM",
    tagline: "The Ultimate Luxury Experience",
    description:
      "Immerse yourself in unmatched comfort and privacy. Premium furnishings combined with top-tier medical care.",
        image: "/habitacion_privada.jpg",

    imageAlt: "VIP Suite",
    price: 200,
    capacity: 1,
    beds: "Premium Adjustable Medical Bed",
    size: "Luxury Suite",
    amenities: [
      "Adjustable Medical Bed",
      "Private Bathroom",
      "Private Entrance with Terrace",
      "Air Conditioning",
      "Smart TV",
    ],
    features: ["Maximum Privacy", "Premium Amenities"],
    highlight: "PREMIUM",
  },
] satisfies Room[];