import {
  ProductSearchRequestBody,
  ProductSearchResponse,
  defaultAttributesToRetrieve,
  defaultPageSize,
} from "@/types/product";
import { meiliClientApi } from "./ClientApi";
import createFetchApi from "@/lib/CreateFetchApi";

const defaultReqBody: ProductSearchRequestBody = {
  q: "",
  attributesToRetrieve: defaultAttributesToRetrieve,
  hitsPerPage: defaultPageSize,
  page: 1,
};

export async function searchProducts(reqObject: ProductSearchRequestBody) {
  const reqBody: ProductSearchRequestBody = {
    ...defaultReqBody,
    ...reqObject,
  };

  try {
    const products = await meiliClientApi.post<ProductSearchResponse>(
      "/indexes/product/search",
      reqBody
    );
    return products.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error fetching");
    return null;
  }
}

export const ClientApiAuthApiToken = createFetchApi(
  process.env.NEXT_PUBLIC_STRAPI_API_URL || ""
);
