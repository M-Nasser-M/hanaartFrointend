import { searchProducts } from "@/lib/services/client/ProductServiceClient";
import type { Getter, Setter } from "jotai";
import { atomEffect } from "jotai-effect";
import {
  storeActiveFilterAtom,
  currentStorePageAtom,
  pageSizeAtom,
  storeProductListAtom,
  storeSearchQueryAtom,
  readStoreSortAtom,
} from "./atoms";

export const searchEffectAtom = atomEffect((get: Getter, set: Setter) => {
  const searchQuery = get(storeSearchQueryAtom.debouncedValueAtom);
  const searchFiltersValue = get(storeActiveFilterAtom);
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
