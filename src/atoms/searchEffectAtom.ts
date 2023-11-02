import { atomEffect } from "jotai-effect";
import {
  storeFilterAtom,
  currentStorePageAtom,
  pageSizeAtom,
  storeProductListAtom,
  storeSearchQueryAtom,
  readStoreSortAtom,
} from "./atoms";
import type { Getter, Setter } from "jotai";
import { searchProducts } from "@/services/ProductServiceClient";

export const searchEffectAtom = atomEffect((get: Getter, set: Setter) => {
  const searchQuery = get(storeSearchQueryAtom.debouncedValueAtom);
  const searchFiltersValue = get(storeFilterAtom);
  const pageSize = get(pageSizeAtom);
  const sortValue = get(readStoreSortAtom);
  const page = get(currentStorePageAtom);

  async function Search(searchQuery: string) {
    const res = await searchProducts({
      q: searchQuery,
      filter: searchFiltersValue,
      sort: sortValue,
      page,
      hitsPerPage: pageSize,
    });

    set(storeProductListAtom, res);
  }

  Search(searchQuery);
});
