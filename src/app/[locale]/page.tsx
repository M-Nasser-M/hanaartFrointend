import { MainPageDataSchema } from "@/types/mainPages";
import { getHomeData } from "@/services/HomeService";
import { Locale } from "@/types/sharedTypes";
import { Metadata, Viewport } from "next";
import Home from "@/components/home/Home";
import { locales } from "@/i18n";
import { parse } from "valibot";

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

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const homeData = await getHomeData(params.locale);

  const { seo } = parse(MainPageDataSchema, homeData?.data);
  return {};
}

export default function Page({ params: { locale } }: Props) {
  return (
    <main>
      <Home />
    </main>
  );
}
