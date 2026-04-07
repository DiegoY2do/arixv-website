// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Definimos los idiomas que soporta nuestra agencia
const locales = ["es", "en"];
const defaultLocale = "es";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignorar rutas internas de Next.js y archivos estáticos (imágenes como tu mockup, íconos)
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") 
  ) {
    return NextResponse.next();
  }

  // 2. Comprobar si la URL ya tiene el idioma configurado
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // Todo está en orden, dejamos que la página cargue
  }

  // 3. Si no hay idioma en la URL, detectamos la preferencia del navegador
  const acceptLanguage = request.headers.get("accept-language") || "";
  // Una lógica sencilla: si su navegador pide inglés, le damos inglés. Si no, español.
  const preferredLocale = acceptLanguage.toLowerCase().includes("en") ? "en" : defaultLocale;

  // 4. Redirigimos automáticamente
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Configuración para que el middleware no se ejecute en lugares innecesarios
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};