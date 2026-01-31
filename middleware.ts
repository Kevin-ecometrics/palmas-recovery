import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getLocalizedPath,
  getPathLang,
  normalizePath,
} from "./src/i18n/routeMap";
import { getRoomPath, getTourPath } from "./src/i18n/slugRoutes";

const isPublicAsset = (pathname: string) =>
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname.includes(".");

const LANGUAGE_COOKIE = "appLanguage";

const hasTrailingSlash = (pathname: string) =>
  pathname.length > 1 && pathname.endsWith("/");

const withTrailingSlash = (pathname: string, trailing: boolean) => {
  if (!trailing) return pathname;
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const trailing = hasTrailingSlash(pathname);

  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const lang = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const pathLang = getPathLang(pathname);

  if (pathLang === "es") {
    if (lang === "en") {
      if (pathname.startsWith("/recorrido/")) {
        const slug = normalizePath(pathname).split("/")[2] || "";
        const target = withTrailingSlash(getTourPath(slug, "en"), trailing);
        if (target !== pathname) {
          const url = request.nextUrl.clone();
          url.pathname = target;
          return NextResponse.redirect(url);
        }
      }

      if (pathname.startsWith("/habitaciones/")) {
        const id = normalizePath(pathname).split("/")[2] || "";
        const target = withTrailingSlash(getRoomPath(id, "en"), trailing);
        if (target !== pathname) {
          const url = request.nextUrl.clone();
          url.pathname = target;
          return NextResponse.redirect(url);
        }
      }
    }

    return NextResponse.next();
  }

  if (lang === "es") {
    const localized = getLocalizedPath(pathname, "es");
    const localizedPath = withTrailingSlash(normalizePath(localized), trailing);
    if (localizedPath !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = localizedPath;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
