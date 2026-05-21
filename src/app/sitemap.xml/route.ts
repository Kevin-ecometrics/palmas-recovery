export const dynamic = "force-static";

const BASE = "https://www.palmasrecovery.com";

type Entry = {
  path: string;
  priority: number;
  freq: string;
  enPath?: string;
  esPath?: string;
};

// Agrega nuevas páginas aquí — el sitemap se actualiza solo en el build
const PAGES: Entry[] = [
  { path: "/",              priority: 1.0, freq: "weekly",  enPath: "/",              esPath: "/es/" },
  { path: "/es/",           priority: 1.0, freq: "weekly",  enPath: "/",              esPath: "/es/" },
  { path: "/about/",        priority: 0.8, freq: "monthly", enPath: "/about/",        esPath: "/nosotros/" },
  { path: "/nosotros/",     priority: 0.8, freq: "monthly", enPath: "/about/",        esPath: "/nosotros/" },
  { path: "/services/",     priority: 0.9, freq: "monthly", enPath: "/services/",     esPath: "/servicios/" },
  { path: "/servicios/",    priority: 0.9, freq: "monthly", enPath: "/services/",     esPath: "/servicios/" },
  { path: "/rooms/",        priority: 0.9, freq: "monthly", enPath: "/rooms/",        esPath: "/habitaciones/" },
  { path: "/habitaciones/", priority: 0.9, freq: "monthly", enPath: "/rooms/",        esPath: "/habitaciones/" },
  { path: "/book/",         priority: 0.9, freq: "weekly",  enPath: "/book/",         esPath: "/reservar/" },
  { path: "/reservar/",     priority: 0.9, freq: "weekly",  enPath: "/book/",         esPath: "/reservar/" },
  { path: "/contact/",      priority: 0.8, freq: "monthly", enPath: "/contact/",      esPath: "/contacto/" },
  { path: "/contacto/",     priority: 0.8, freq: "monthly", enPath: "/contact/",      esPath: "/contacto/" },
  { path: "/blog/",         priority: 0.7, freq: "weekly",  enPath: "/blog/",         esPath: "/articulos/" },
  { path: "/articulos/",    priority: 0.7, freq: "weekly",  enPath: "/blog/",         esPath: "/articulos/" },
  { path: "/blog/blog1/",         priority: 0.7, freq: "monthly", enPath: "/blog/blog1/",         esPath: "/articulos/blog1/" },
  { path: "/articulos/blog1/",    priority: 0.7, freq: "monthly", enPath: "/blog/blog1/",         esPath: "/articulos/blog1/" },
  { path: "/blog/blog2/",         priority: 0.7, freq: "monthly", enPath: "/blog/blog2/",         esPath: "/articulos/blog2/" },
  { path: "/articulos/blog2/",    priority: 0.7, freq: "monthly", enPath: "/blog/blog2/",         esPath: "/articulos/blog2/" },
  { path: "/blog/blog3/",         priority: 0.7, freq: "monthly", enPath: "/blog/blog3/",         esPath: "/articulos/blog3/" },
  { path: "/articulos/blog3/",    priority: 0.7, freq: "monthly", enPath: "/blog/blog3/",         esPath: "/articulos/blog3/" },
  { path: "/tour/360/",           priority: 0.6, freq: "monthly", enPath: "/tour/360/",           esPath: "/recorrido/360/" },
  { path: "/recorrido/360/",      priority: 0.6, freq: "monthly", enPath: "/tour/360/",           esPath: "/recorrido/360/" },
  { path: "/tour/shared-room/",        priority: 0.6, freq: "monthly" },
  { path: "/tour/private-room/",       priority: 0.6, freq: "monthly" },
  { path: "/tour/large-private-room/", priority: 0.6, freq: "monthly" },
  { path: "/tour/vip-suite/",          priority: 0.6, freq: "monthly" },
];

function buildXml(): string {
  const urls = PAGES.map(({ path, priority, freq, enPath, esPath }) => {
    const hreflang =
      enPath && esPath
        ? `\n    <xhtml:link rel="alternate" hreflang="en" href="${BASE}${enPath}"/>` +
          `\n    <xhtml:link rel="alternate" hreflang="es" href="${BASE}${esPath}"/>`
        : "";

    return (
      `  <url>\n` +
      `    <loc>${BASE}${path}</loc>\n` +
      `    <changefreq>${freq}</changefreq>\n` +
      `    <priority>${priority.toFixed(1)}</priority>${hreflang}\n` +
      `  </url>`
    );
  }).join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n` +
    `<urlset\n` +
    `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n` +
    `>\n` +
    urls + "\n" +
    `</urlset>\n`
  );
}

export function GET() {
  return new Response(buildXml(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
