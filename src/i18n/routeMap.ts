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
  | "tour"
  | "blog"
  | "blog1"
  | "blog2"
  | "blog3"
  | "about"
  | "tourshared"
  | "tourprivate"
  | "tourlargeprivate"
  | "tourvip"
  | "search";

export const ROUTE_PAIRS: Array<{ key: RouteKey; es: string; en: string }> = [
  { key: "home", es: "/es", en: "/en" },
  { key: "book", es: "/reservar", en: "/book" },
  { key: "services", es: "/servicios", en: "/services" },
  { key: "contact", es: "/contacto", en: "/contact" },
  { key: "panorama", es: "/panorama", en: "/panorama" },
  { key: "privacy", es: "/privacidad", en: "/privacy" },
  { key: "terms", es: "/terminos", en: "/terms" },
  { key: "rooms", es: "/habitaciones", en: "/rooms" },
  { key: "tour", es: "/recorrido/360", en: "/tour/360" },
  { key: "blog", es: "/articulos", en: "/blog" },
  { key: "blog1", es: "/articulos/blog1", en: "/blog/blog1" },
  { key: "blog2", es: "/articulos/blog2", en: "/blog/blog2" },
  { key: "blog3", es: "/articulos/blog3", en: "/blog/blog3" },
  { key: "about", es: "/nosotros", en: "/about" },
  { key: "tourshared", es: "/tour/360/shared", en: "/tour/360/shared" },
  { key: "tourprivate", es: "/tour/360/dsa", en: "/tour/360/private" },
  { key: "tourlargeprivate", es: "/tour/360/large-private", en: "/tour/360/large-private" },
  { key: "tourvip", es: "/tour/360/vip", en: "/tour/360/vip" },
  { key: "search", es: "/busqueda", en: "/search-results" },
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
  if (normalized === "/") {
    return getRouteByKey("home", lang);
  }
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
