import Panorama360 from "@/app/components/Panorama360";
import { privateRoomImages } from "@/app/components/data/360.data";

export default function Private() {
  return (
    <Panorama360
      images={privateRoomImages}
      brandName="PALMAS RECOVERY - PRIVATE Room"
    />
  );
}
