import Providers from "@/components/providers/Providers";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/navbar/Navbar";
import { Container } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales } from "@/i18n";

import "@radix-ui/themes/styles.css";
import "./globals.css";

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

  const dir = locale == "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <Providers dir={dir}>
          <NextIntlClientProvider
            timeZone="Africa/Cairo"
            locale={locale}
            messages={messages}
          >
            <Navbar />
            <Container size="4">{children}</Container>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
