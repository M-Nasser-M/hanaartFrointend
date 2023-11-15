import { options } from "../api/auth/[...nextauth]/authOtions";
import { Locale, SessionSchema } from "@/types/sharedTypes";
import Providers from "@/components/providers/Providers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Navbar from "@/components/navbar/Navbar";
import { Container } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { notFound } from "next/navigation";
import { keyof, safeParse } from "valibot";
import { ReactNode } from "react";
import { locales } from "@/i18n";

import "./globals.css";
import { getTranslationObject } from "@/lib/translation";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!locales.includes(locale)) notFound();

  unstable_setRequestLocale(locale);

  const session = await getServerSession(options);
  const t = await getTranslations("navbar");
  const validatedSession = safeParse(SessionSchema, session);

  const dir = locale == "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers dir={dir}>
          <Navbar
            session={validatedSession.success ? validatedSession.output : null}
            translations={{
              home: t("home"),
              store: t("store"),
              blog: t("blog"),
              signin: t("signin"),
              signout: t("signout"),
              profile: t("profile"),
            }}
          />
          <Container size="4" mb="9">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
