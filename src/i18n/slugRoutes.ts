import type { Lang } from "./routeMap";

const ROOM_ID_MAP: Record<string, string> = {
  shared: "compartida",
  private: "privada",
  vip: "vip",
};

const ROOM_ID_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(ROOM_ID_MAP).map(([en, es]) => [es, en])
);

const TOUR_SLUG_MAP: Record<string, string> = {
  "private-room": "habitacion-privada",
  "shared-room": "habitacion-compartida",
  "vip-suite": "suite-vip",
};

const TOUR_SLUG_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(TOUR_SLUG_MAP).map(([en, es]) => [es, en])
);

export const getTourPath = (slug: string, lang: Lang) => {
  if (lang === "es") {
    return `/recorrido/360/${TOUR_SLUG_MAP[slug] || slug}`;
  }
  return `/tour/360/${TOUR_SLUG_MAP_REVERSE[slug] || slug}`;
};

export const getRoomTourPath = (roomId: string, lang: Lang) => {
  if (lang === "es") {
    return `/recorrido/360/#${ROOM_ID_MAP[roomId] || roomId}`;
  }
  return `/tour/360/#${ROOM_ID_MAP_REVERSE[roomId] || roomId}`;
};

export const getRoomIdFromPath = (roomId: string) => {
  return ROOM_ID_MAP_REVERSE[roomId] || roomId;
};

export const getTourSlugFromPath = (slug: string) => {
  return TOUR_SLUG_MAP_REVERSE[slug] || slug;
};
