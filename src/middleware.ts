import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { generateMatcherLocales } from "./lib/utils";

const formattedLocales = generateMatcherLocales(locales);

export default createMiddleware({
  locales: locales,

  defaultLocale: "en",

  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(en|ar)/:path*`],
};
