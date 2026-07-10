import VideoTour from "@/app/components/VideoTour";
import { largePrivateRoomImages } from "@/app/components/data/360.data";

export default function LargePrivate() {
  return (
    <VideoTour
      videoSrc="/Habitacion palmas 1.mp4"
      poster={largePrivateRoomImages[0]?.src}
      brandName="PALMAS RECOVERY - LARGE PRIVATE Room"
    />
  );
}
