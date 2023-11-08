import { searchProducts } from "@/services/ProductServiceClient";
import SearchComponent from "./SearchComponent";
import { Locale } from "@/types/sharedTypes";
import { safeParse } from "valibot";
import React from "react";
import {
  ProductSearchResponseSchema,
  defaultAttributesToRetrieve,
  defaultPageSize,
} from "@/types/product";

export const revalidate = 3600;

type Props = {
  params: { locale: Locale };
  searchParams: {
    page?: number;
    searchquery?: string;
    sort?: string;
    filter?: string;
  };
};

const Page = async ({ params: { locale }, searchParams }: Props) => {
  const searchQuery = searchParams.searchquery ? searchParams.searchquery : "";
  const sort: string[] =
    searchParams.sort &&
    (searchParams.sort.endsWith(":asc") || searchParams.sort.endsWith(":desc"))
      ? [searchParams.sort]
      : [];
  const page =
    searchParams.page &&
    !isNaN(searchParams.page) &&
    Number(searchParams.page) > 0
      ? Number(searchParams.page)
      : 1;
  const filter: string[] = searchParams.filter
    ? [...JSON.parse(searchParams.filter)]
    : [`locale = ${locale}`];

  const products = await searchProducts({
    q: searchQuery,
    filter,
    page,
    attributesToRetrieve: defaultAttributesToRetrieve,
    sort,
    hitsPerPage: defaultPageSize,
  });

  const validatedData = safeParse(ProductSearchResponseSchema, products);

  if (validatedData.success) {
    return (
      <SearchComponent
        products={validatedData.output}
        filter={filter}
        sort={sort.length > 0 ? sort[0] : null}
        searchQuery={searchQuery}
        page={page}
        numberOfpages={validatedData.output.totalPages}
      />
    );
  }
};

export default Page;
