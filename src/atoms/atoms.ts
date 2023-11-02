import { ProductSearchResponse, defaultPageSize } from "@/types/product";
import type { Session } from "@/types/sharedTypes";
import atomWithDebounce from "./atomWithDebounce";
import { atom } from "jotai";

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
export const storeFilterAtom = atom<string[]>([]);
