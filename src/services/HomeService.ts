import { MainPage } from "@/types/mainPages";
import { Locale } from "@/types/sharedTypes";
import { serverApi } from "./ServerApi";
import qs from "qs";

export async function getHomeData(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApi<MainPage>(`/home?${queryString}`);

    return response.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}
