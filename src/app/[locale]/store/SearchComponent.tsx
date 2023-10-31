"use client";
import { filterAtom, productListAtom, searchQueryAtom } from "@/atoms/atoms";
import { searchProducts } from "@/services/ProductServiceClient";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDidUpdate } from "@/lib/hooks/use-did-update";
import { ProductSearchResponse } from "@/types/product";
import { useTranslations } from "next-intl";
import { useHydrateAtoms } from "jotai/utils";
import { Search } from "lucide-react";
import FilterSort from "./FilterSort";
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

type Props = {
  products: ProductSearchResponse;
};

const SearchComponent = ({ products }: Props) => {
  useHydrateAtoms([[productListAtom, products]]);
  const [producctList, setProducctList] = useAtom(productListAtom);
  const searchQuery = useAtomValue(searchQueryAtom.currentValueAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom.debouncedValueAtom);
  const searchFilter = useAtomValue(filterAtom);

  const t = useTranslations("store");

  useDidUpdate(() => {
    async function Search(query: string) {
      const res = await searchProducts({ q: query });
      console.log(res);
      setProducctList(res);
    }
    Search(searchQuery);
  }, [searchQuery, setProducctList]);

  return (
    <>
      <TextField.Root mb="9">
        <TextField.Slot>
          <Search height="16" />
        </TextField.Slot>
        <TextField.Input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search our store"
        />
      </TextField.Root>
      <FilterSort />
      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="3"
        mb="9"
        width="100%"
        px={{ initial: "9", md: "4", lg: "0" }}
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
    </>
  );
};

export default SearchComponent;
