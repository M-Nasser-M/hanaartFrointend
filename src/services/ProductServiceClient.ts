import {
  ProductSearchRequestBody,
  ProductSearchResponse,
} from "@/types/product";
import { meiliClientApi } from "./ClientApi";

const defaultReqBody: ProductSearchRequestBody = {
  q: "",
  attributesToRetrieve: [
    "name",
    "price",
    "description",
    "offer_price",
    "availableStock",
    "slug",
    "cover",
  ],
  filter: ["locale = en"],
};

export async function searchProducts(reqObject: ProductSearchRequestBody) {
  const attributesToRetrieve = [
    "name",
    "price",
    "description",
    "offer_price",
    "availableStock",
    "slug",
    "cover",
  ];

  const reqBody: ProductSearchRequestBody = {
    ...defaultReqBody,
    ...reqObject,
  };

  const products = await meiliClientApi.post<ProductSearchResponse>(
    "/indexes/product/search",
    reqBody
  );

  return products.data;
}
