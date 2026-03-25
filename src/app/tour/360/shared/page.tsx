import Panorama360 from "@/app/components/Panorama360";
import { sharedRoomImages } from "@/app/components/data/360.data";

export default function Shared() {
  return (
    <Panorama360
      images={sharedRoomImages}
      brandName="PALMAS RECOVERY - Shared Room"
    />
  );
}
