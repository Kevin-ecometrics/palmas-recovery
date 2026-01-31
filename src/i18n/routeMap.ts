export type Lang = "es" | "en";

export type RouteKey =
  | "home"
  | "book"
  | "services"
  | "contact"
  | "panorama"
  | "privacy"
  | "terms"
  | "rooms"
  | "tour";

export const ROUTE_PAIRS: Array<{ key: RouteKey; es: string; en: string }> = [
  { key: "home", es: "/", en: "/" },
  { key: "book", es: "/reservar", en: "/book" },
  { key: "services", es: "/servicios", en: "/services" },
  { key: "contact", es: "/contacto", en: "/contact" },
  { key: "panorama", es: "/panorama", en: "/panorama" },
  { key: "privacy", es: "/privacidad", en: "/privacy" },
  { key: "terms", es: "/terminos", en: "/terms" },
  { key: "rooms", es: "/habitaciones", en: "/rooms" },
  { key: "tour", es: "/recorrido", en: "/tour" },
];

const routeMap = ROUTE_PAIRS.reduce<Record<RouteKey, { es: string; en: string }>>(
  (acc, item) => {
    acc[item.key] = { es: item.es, en: item.en };
    return acc;
  },
  {} as Record<RouteKey, { es: string; en: string }>
);

export const normalizePath = (path: string) => {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
};

export const getRouteByKey = (key: RouteKey, lang: Lang) => {
  return routeMap[key][lang];
};

export const getLocalizedPath = (pathname: string, lang: Lang) => {
  const normalized = normalizePath(pathname);
  const match = ROUTE_PAIRS.find(
    (pair) =>
      normalizePath(pair.es) === normalized ||
      normalizePath(pair.en) === normalized
  );

  if (!match) {
    return normalized;
  }

  return match[lang];
};

export const getPathLang = (pathname: string): Lang | null => {
  const normalized = normalizePath(pathname);
  const match = ROUTE_PAIRS.find(
    (pair) =>
      normalizePath(pair.es) === normalized ||
      normalizePath(pair.en) === normalized
  );

  if (!match) return null;

  if (normalizePath(match.en) === normalized && match.en !== match.es) {
    return "en";
  }

  if (normalizePath(match.es) === normalized) {
    return "es";
  }

  return null;
};

export const getSpanishPathForEnglish = (pathname: string) => {
  const normalized = normalizePath(pathname);
  const match = ROUTE_PAIRS.find(
    (pair) => normalizePath(pair.en) === normalized && pair.en !== pair.es
  );

  return match ? match.es : null;
};
