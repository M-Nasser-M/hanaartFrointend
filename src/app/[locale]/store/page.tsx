import { searchProducts } from "@/services/ProductServiceClient";
import { ProductSearchResponseSchema } from "@/types/product";
import SearchComponent from "./SearchComponent";
import { Locale } from "@/types/sharedTypes";
import { safeParse } from "valibot";
import React from "react";

export const revalidate = 3600;

type Props = { params: { locale: Locale }; searchParams: { page?: number } };

const Page = async ({ params: { locale }, searchParams: { page } }: Props) => {
  const products = await searchProducts({
    q: "",
    filter: [`locale = ${locale}`],
  });

  const validatedData = safeParse(ProductSearchResponseSchema, products);

  if (validatedData.success) {
    return <SearchComponent products={validatedData.output} />;
  }
};

export default Page;
