"use client";

import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { getLocalizedPath } from "@/i18n/routeMap";

const BLOG_IMAGES = ["/blog1.png", "/blog2.jpg", "/blog3.jpg"];

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("es") ? "es" : "en";
  const items = t("blogs.items", { returnObjects: true }) as Array<{
    title: string;
    excerpt: string;
    category: string;
  }>;
  
  const blogUrls = ["/blog/blog1", "/blog/blog2", "/blog/blog3"];

  return (
    <section className="pt-16 sm:pt-28 lg:pt-36 pb-20 sm:pb-32 lg:pb-48 bg-[#fffaf6]">
      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-12 items-start">
          <div className="text-black">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight mb-5 sm:mb-6">
              {t("blogs.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black/70 mb-6 sm:mb-8 max-w-md">
              {t("blogs.subtitle")}
            </p>
            <Link
              href={getLocalizedPath("/blog", currentLang)} // Cambiado de "/rooms" a "/blog"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black hover:bg-black/5 transition"
            >
              {t("blogs.cta")}
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-0 md:divide-x divide-black/20">
            {items.map((item: { title: string; excerpt: string; category: string }, index: number) => (
              <article
                key={item.title}
                className="bg-white/70 border border-black/10 rounded-2xl p-4 sm:p-5 md:bg-transparent md:border-0 md:rounded-none md:p-0 md:px-5"
              >
                <div className="overflow-hidden">
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl md:rounded-none">
                    <img
                      src={BLOG_IMAGES[index % BLOG_IMAGES.length]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 right-3 bg-[#f0b16b] text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-black/10 md:border-black/20">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      {t("blogs.kicker")}
                    </p>
                    <h3 className="text-xl font-semibold text-black mt-2 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/70 leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                    <Link
                      href={getLocalizedPath(
                        blogUrls[index % blogUrls.length], // Usando URLs de blog
                        currentLang
                      )}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-black/70 transition-colors"
                    >
                      {t("blogs.cta")}
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}