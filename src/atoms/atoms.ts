import { changeFilterCheckPure } from "@/lib/utils";
import type { Locale, Session } from "@/types/sharedTypes";
import atomWithDebounce from "./atomWithDebounce";
import { atom } from "jotai";
import {
  Category,
  ProductSearchResponse,
  SubCategory,
  defaultPageSize,
  filterDefaultCheckStatus,
} from "@/types/product";

export const cartAtom = atom(null);

export const storeProductListAtom = atom<ProductSearchResponse | null>(null);

export const storeSearchQueryAtom = atomWithDebounce<string>("");

export const pageSizeAtom = atom<number>(defaultPageSize);

export const storeSortAtom = atom<string | null>(null);

export const readStoreSortAtom = atom<string[] | []>((get) => {
  const currentStoreSortValue = get(storeSortAtom);
  return currentStoreSortValue === null ? [] : [currentStoreSortValue];
});

export const storeNumberOfPagesAtom = atom<number>(0);

export const sessionAtom = atom<Session | null>(null);

export const currentStorePageAtom = atom<number>(1);

export const storeActiveFilterAtom = atom<string[]>([]);

export const storeSelectedFiltersAtom = atom(filterDefaultCheckStatus);

export const writeStoreSelectedFiltersAtom = atom(
  null,
  (get, set, values: string[]) => {
    for (const value of values) {
      const filter = value.match(/'([^']+)'/);
      if (
        filter &&
        [...Object.values(Category), ...Object.values(SubCategory)].includes(
          filter[1] as Category | SubCategory
        )
      ) {
        set(
          storeSelectedFiltersAtom,
          changeFilterCheckPure(
            get(storeSelectedFiltersAtom),
            filter ? (filter[1] as Category | SubCategory) : null,
            true
          )
        );
      }
    }
  }
);
