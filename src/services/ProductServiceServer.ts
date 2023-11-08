import { Product, Products, defaultPageSize } from "@/types/product";
import { StoreMainPage } from "@/types/mainPages";
import { Locale } from "@/types/sharedTypes";
import { serverApi } from "./ServerApi";
import qs from "qs";

export async function getStoreMainPage(locale: Locale) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
    locale,
  });

  try {
    const response = await serverApi.get<StoreMainPage>(
      `/store?${queryString}`
    );

    return response.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export async function getProductPage(
  locale: Locale,
  page: number = 1,
  pageSize: number = defaultPageSize
) {
  const queryString = qs.stringify({
    populate: { cover: true },
    locale,
    pagination: { page, pageSize },
  });

  try {
    const response = await serverApi.get<Products>(`/products?${queryString}`);

    return response.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export async function getProductUsingID(id: number) {
  const queryString = qs.stringify({
    populate: { seo: { populate: ["metaImage"] } },
  });

  try {
    const response = await serverApi.get<Product>(
      `/products/${id}?${queryString}`
    );

    return response.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}

export async function getProductUsingSlug(slug: string) {
  const queryString = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      seo: { populate: ["metaImage"] },
      images: true,
      cover: true,
    },
  });

  try {
    const response = await serverApi.get<Products>(`/products?${queryString}`);

    return response.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");

    return null;
  }
}
