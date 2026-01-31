import TourEsClient from "./TourEsClient";

export const generateStaticParams = () => [
  { slug: "habitacion-privada" },
  { slug: "habitacion-compartida" },
  { slug: "suite-vip" },
];

export default function TourEsPage({ params }: { params: { slug: string } }) {
  return <TourEsClient slug={params.slug} />;
}
