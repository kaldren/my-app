import { NextRequestWithAuth } from 'next-auth/middleware';

let locales = ['bg', 'en', 'en-US']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequestWithAuth) {
  const headerLang = request.headers.get('Accept-Language');

  if (!headerLang) return 'en'; // default locale if header is not set

  // Split header into array of language codes
  const requestedLocales = headerLang.split(',').map(lang => 
      lang.split(';')[0].split('-')[0] // Get primary subtag
  );

  // Find the first requested locale that we support
  for (let lang of requestedLocales) {
      console.log(lang);
    if (locales.includes(lang)) return lang;
  }

  // If none of the user's preferred locales are supported, return a default locale
  return 'en';
}
 
export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}