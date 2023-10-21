import { getHomeData } from "@/services/HomeService";
import { Metadata, ResolvingMetadata } from "next";
import { Locale } from "@/types/sharedTypes";
import Home from "@/components/home/Home";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const homeData = await getHomeData(params.locale);
  const { seo } = homeData.data;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    viewport: seo.metaViewport,
    robots: seo.metaRobots,
  };
}

export default function Page({ params: { locale } }: Props) {
  return (
    <main>
      <Home />
    </main>
  );
}
