import { promises as fs } from "fs";
import path from "path";

const SITE_URL = "https://www.palmasrecovery.com";
const OUT_DIR = process.env.OUT_DIR || path.join(process.cwd(), "out");
const SITEMAP_PATH = path.join(OUT_DIR, "sitemap.xml");
const ROBOTS_PATH = path.join(OUT_DIR, "robots.txt");

async function collectUrls(dir, baseUrl) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const urls = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      urls.push(...(await collectUrls(fullPath, baseUrl)));
      continue;
    }

    if (!entry.name.endsWith(".html")) continue;
    if (["404.html", "_app.html", "_document.html"].includes(entry.name))
      continue;

    const relativePath = path.relative(OUT_DIR, fullPath);
    const urlPath = relativePath
      .replace(/\\\\/g, "/")
      .replace(/index\.html$/, "")
      .replace(/\.html$/, "");

    const normalized = urlPath === "" ? "/" : `/${urlPath}`;
    urls.push(`${SITE_URL}${normalized}`);
  }

  return urls;
}

function buildSitemap(urls) {
  const urlEntries = urls
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`)
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urlEntries}\n` +
    `</urlset>\n`
  );
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

async function run() {
  try {
    const stats = await fs.stat(OUT_DIR);
    if (!stats.isDirectory()) {
      throw new Error(`${OUT_DIR} is not a directory.`);
    }

    const urls = await collectUrls(OUT_DIR, SITE_URL);
    const uniqueUrls = Array.from(new Set(urls)).sort();

    await fs.writeFile(SITEMAP_PATH, buildSitemap(uniqueUrls), "utf8");
    await fs.writeFile(ROBOTS_PATH, buildRobots(), "utf8");

    console.log(`Generated sitemap at ${SITEMAP_PATH}`);
    console.log(`Generated robots.txt at ${ROBOTS_PATH}`);
  } catch (error) {
    console.error("Failed to generate sitemap/robots:", error);
    process.exit(1);
  }
}

run();
