import { ROOMS } from "../rooms.data";
import RoomPageClient from "./RoomPageClient";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ id: room.id }));
}

export default function RoomPage({ params }: { params: { id: string } }) {
  return <RoomPageClient roomId={params.id} />;
}
