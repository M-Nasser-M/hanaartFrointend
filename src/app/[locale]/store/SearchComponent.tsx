"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import { ProductSearchResponse } from "@/types/product";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useTranslations } from "next-intl";
import FilterSort from "./FilterSort";
import { Search } from "lucide-react";
import Image from "next/image";
import {
  AspectRatio,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Inset,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  storeFilterAtom,
  currentStorePageAtom,
  storeProductListAtom,
  storeSearchQueryAtom,
  storeSortAtom,
  storeNumberOfPagesAtom,
} from "@/atoms/atoms";
import { handleAddClientParamsRoute } from "@/lib/handleClientParams";

type Props = {
  products: ProductSearchResponse;
  filter: string[];
  sort: string | null;
  searchQuery: string;
  page: number;
  numberOfpages: number;
};

const SearchComponent = (props: Props) => {
  useHydrateAtoms([
    [storeSearchQueryAtom.debouncedValueAtom, props.searchQuery],
    [storeNumberOfPagesAtom, props.numberOfpages],
    [storeProductListAtom, props.products],
    [currentStorePageAtom, props.page],
    [storeFilterAtom, props.filter],
    [storeSortAtom, props.sort],
  ]);
  const setSearchQuery = useSetAtom(storeSearchQueryAtom.debouncedValueAtom);
  const producctList = useAtomValue(storeProductListAtom);
  const setCurrentPage = useSetAtom(currentStorePageAtom);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("store");
  return (
    <>
      <TextField.Root mb="9">
        <TextField.Slot>
          <Search height="16" />
        </TextField.Slot>
        <TextField.Input
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleAddClientParamsRoute(
              searchParams,
              router,
              pathname,
              "searchquery",
              e.target.value
            );
          }}
          placeholder="Search our store"
        />
        {/* <TextField.Slot p="0">
          <Button>Search</Button>
        </TextField.Slot> */}
      </TextField.Root>
      <FilterSort />
      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="3"
        mb="4"
        width="100%"
        px={{ initial: "4", md: "2", lg: "0" }}
      >
        {producctList?.hits.map((product) => (
          <Card key={product.slug}>
            <Inset clip="padding-box" side="top" pb="current">
              <AspectRatio ratio={16 / 9}>
                <Image
                  alt={product.cover?.alternativeText || ""}
                  fill
                  src={product.cover?.url!}
                />
              </AspectRatio>
            </Inset>
            <Heading size="6" as="h3">
              {product.name}
            </Heading>
            <Text size="4" as="p">
              description
            </Text>
            <Flex justify="between">
              <Heading as="h3">
                {product.offer_price ? product.offer_price : product.price}{" "}
                {t("currency")}
              </Heading>
              <Button variant="outline">{t("addtocart")}</Button>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Pagination
        handleNavigation={(pageNo) => {
          setCurrentPage(pageNo);
          handleAddClientParamsRoute(
            searchParams,
            router,
            pathname,
            "page",
            String(pageNo)
          );
        }}
        numberOfPages={props.numberOfpages}
      />
    </>
  );
};

export default SearchComponent;
