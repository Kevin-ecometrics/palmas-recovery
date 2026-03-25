import Panorama360 from "@/app/components/Panorama360";
import { lobbyRoomImages } from "@/app/components/data/360.data";

export default function Lobby() {
  return (
    <Panorama360
      images={lobbyRoomImages}
      brandName="PALMAS RECOVERY - Lobby Room"
    />
  );
}
