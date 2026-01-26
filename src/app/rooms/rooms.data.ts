export type Room = {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number;
  capacity: number;
  beds: string;
  size: string;
  amenities: string[]; // Cambiar a string[] genérico
  features: string[];
  highlight: string;
};


export const ROOMS: Room[] = [
  {
    id: "shared",
    name: "Shared Room",
    subtitle: "POPULAR",
    tagline: "Comfortable & Affordable",
    description:
      "Experience exceptional care in a shared space designed for comfort and connection. Ideal for guests seeking professional recovery services.",
    image: "/shared-room.jpg",
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
    image: "/private-room.jpg",
    imageAlt: "Private Room",
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
    image: "/vip-suite.jpeg",
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
] as const;

