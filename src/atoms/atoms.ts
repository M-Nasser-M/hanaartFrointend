import { Session } from "@/types/sharedTypes";
import { atom } from "jotai";
import atomWithDebounce from "./atomWithDebounce";
import { ProductSearchResponse } from "@/types/product";

export const sessionAtom = atom<Session | null>(null);
export const sortAtom = atom<string>("''");
export const filterAtom = atom<string[]>([]);
export const searchQueryAtom = atomWithDebounce<string>("");
export const productListAtom = atom<ProductSearchResponse>({
  hits: [],
  query: "''",
});
