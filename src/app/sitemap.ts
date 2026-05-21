import { MetadataRoute } from "next";

const BASE = "https://www.palmasrecovery.com";

type Entry = {
  url: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  enPath?: string;
  esPath?: string;
};

const pages: Entry[] = [
  { url: "/",           changeFrequency: "weekly",  priority: 1.0, enPath: "/",           esPath: "/es/" },
  { url: "/es/",        changeFrequency: "weekly",  priority: 1.0, enPath: "/",           esPath: "/es/" },
  { url: "/about/",     changeFrequency: "monthly", priority: 0.8, enPath: "/about/",     esPath: "/nosotros/" },
  { url: "/nosotros/",  changeFrequency: "monthly", priority: 0.8, enPath: "/about/",     esPath: "/nosotros/" },
  { url: "/services/",  changeFrequency: "monthly", priority: 0.9, enPath: "/services/",  esPath: "/servicios/" },
  { url: "/servicios/", changeFrequency: "monthly", priority: 0.9, enPath: "/services/",  esPath: "/servicios/" },
  { url: "/rooms/",     changeFrequency: "monthly", priority: 0.9, enPath: "/rooms/",     esPath: "/habitaciones/" },
  { url: "/habitaciones/", changeFrequency: "monthly", priority: 0.9, enPath: "/rooms/",  esPath: "/habitaciones/" },
  { url: "/book/",      changeFrequency: "weekly",  priority: 0.9, enPath: "/book/",      esPath: "/reservar/" },
  { url: "/reservar/",  changeFrequency: "weekly",  priority: 0.9, enPath: "/book/",      esPath: "/reservar/" },
  { url: "/contact/",   changeFrequency: "monthly", priority: 0.8, enPath: "/contact/",   esPath: "/contacto/" },
  { url: "/contacto/",  changeFrequency: "monthly", priority: 0.8, enPath: "/contact/",   esPath: "/contacto/" },
  { url: "/blog/",      changeFrequency: "weekly",  priority: 0.7, enPath: "/blog/",      esPath: "/articulos/" },
  { url: "/articulos/", changeFrequency: "weekly",  priority: 0.7, enPath: "/blog/",      esPath: "/articulos/" },
  { url: "/blog/blog1/",      changeFrequency: "monthly", priority: 0.7, enPath: "/blog/blog1/",      esPath: "/articulos/blog1/" },
  { url: "/articulos/blog1/", changeFrequency: "monthly", priority: 0.7, enPath: "/blog/blog1/",      esPath: "/articulos/blog1/" },
  { url: "/blog/blog2/",      changeFrequency: "monthly", priority: 0.7, enPath: "/blog/blog2/",      esPath: "/articulos/blog2/" },
  { url: "/articulos/blog2/", changeFrequency: "monthly", priority: 0.7, enPath: "/blog/blog2/",      esPath: "/articulos/blog2/" },
  { url: "/blog/blog3/",      changeFrequency: "monthly", priority: 0.7, enPath: "/blog/blog3/",      esPath: "/articulos/blog3/" },
  { url: "/articulos/blog3/", changeFrequency: "monthly", priority: 0.7, enPath: "/blog/blog3/",      esPath: "/articulos/blog3/" },
  { url: "/tour/360/",         changeFrequency: "monthly", priority: 0.6, enPath: "/tour/360/",      esPath: "/recorrido/360/" },
  { url: "/recorrido/360/",    changeFrequency: "monthly", priority: 0.6, enPath: "/tour/360/",      esPath: "/recorrido/360/" },
  { url: "/tour/shared-room/",       changeFrequency: "monthly", priority: 0.6 },
  { url: "/tour/private-room/",      changeFrequency: "monthly", priority: 0.6 },
  { url: "/tour/large-private-room/",changeFrequency: "monthly", priority: 0.6 },
  { url: "/tour/vip-suite/",         changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ url, changeFrequency, priority, enPath, esPath }) => ({
    url: `${BASE}${url}`,
    changeFrequency,
    priority,
    ...(enPath && esPath
      ? {
          alternates: {
            languages: {
              en: `${BASE}${enPath}`,
              es: `${BASE}${esPath}`,
            },
          },
        }
      : {}),
  }));
}
