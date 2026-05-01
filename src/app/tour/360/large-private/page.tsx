import Panorama360 from "@/app/components/Panorama360";
import { largePrivateRoomImages } from "@/app/components/data/360.data";

export default function LargePrivate() {
  return (
    <Panorama360
      images={largePrivateRoomImages}
      brandName="PALMAS RECOVERY - LARGE PRIVATE Room"
    />
  );
}
