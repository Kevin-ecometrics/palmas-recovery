import RoomEsClient from "./RoomEsClient";

export const generateStaticParams = () => [
  { id: "compartida" },
  { id: "privada" },
  { id: "vip" },
];

export default function RoomEsPage({ params }: { params: { id: string } }) {
  return <RoomEsClient id={params.id} />;
}
