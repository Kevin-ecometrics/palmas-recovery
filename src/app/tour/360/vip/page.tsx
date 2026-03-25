import Panorama360 from "@/app/components/Panorama360";
import { vipRoomImages } from "@/app/components/data/360.data";

export default function Vip() {
  return (
    <Panorama360
      images={vipRoomImages}
      brandName="PALMAS RECOVERY - VIP Room"
    />
  );
}
