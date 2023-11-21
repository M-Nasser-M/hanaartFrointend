import { Locale } from "@/types/sharedTypes";
import { usePathname } from "next/navigation";

export const useGetLocalFromPathname = (): Locale => {
  const pathname = usePathname();
  return pathname?.split("/")[1] as Locale;
};
