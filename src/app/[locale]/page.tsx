import { unstable_setRequestLocale } from "next-intl/server";
import { MainPageDataSchema } from "@/types/mainPages";
import { getHomeData } from "@/services/HomeService";
import { Locale } from "@/types/sharedTypes";
import Home from "@/components/home/Home";
import { locales } from "@/i18n";
import { parse } from "valibot";
import { Metadata } from "next";

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const homeData = await getHomeData(params.locale);

  const { seo } = parse(MainPageDataSchema, homeData?.data);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.metaRobots,
  };
}

export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return (
    <main>
      <Home />
    </main>
  );
}
