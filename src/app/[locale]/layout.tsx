import Providers from "@/components/providers/Providers";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/navbar/Navbar";
import { Container } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales } from "@/i18n";

import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/authOtions";
import { parse, safeParse } from "valibot";
import { SessionSchema } from "@/types/sharedTypes";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const session = await getServerSession(options);
  const validatedSession = safeParse(SessionSchema, session);

  const dir = locale == "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider
          timeZone="Africa/Cairo"
          locale={locale}
          messages={messages}
        >
          <Providers dir={dir}>
            <Navbar
              session={
                validatedSession.success ? validatedSession.output : null
              }
            />
            <Container size="4">{children}</Container>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
