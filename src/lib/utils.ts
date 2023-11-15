import { Category, SubCategory } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const changeFilterCheckPure = (
  storeSelectedFilters: Record<
    SubCategory | Category,
    {
      checked: boolean;
      filter: string;
    }
  >,
  filter: Category | SubCategory | null,
  checked: boolean
) => {
  if (filter === null) return storeSelectedFilters;

  return {
    ...storeSelectedFilters,
    [filter]: { ...storeSelectedFilters[filter], checked },
  };
};

export const generateMatcherLocales = (localesArr: string[]) => {
  const lastIndex = localesArr.length - 1;
  const matcherArrray = localesArr.map((locale, index) => {
    if (index !== lastIndex) return `${locale}|`;
    return locale;
  });
  return `/(${matcherArrray.join("")})/:path*`;
};
