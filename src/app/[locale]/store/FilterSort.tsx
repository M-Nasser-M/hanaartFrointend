"use client";
import { Button, Flex, ScrollArea, Select, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleAddClientParamsRoute } from "@/lib/handleClientParams";
import { storeFilterAtom, storeSortAtom } from "@/atoms/atoms";
import { searchEffectAtom } from "@/atoms/searchEffectAtom";
import { Check, ListFilter, XCircle } from "lucide-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { categories } from "@/types/product";
import { useAtom, useSetAtom } from "jotai";
import React from "react";

const FilterSort = () => {
  useAtom(searchEffectAtom);
  const setFilterValue = useSetAtom(storeFilterAtom);
  const setSortValue = useSetAtom(storeSortAtom);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    const atomValue = value !== "null" ? value : null;
    setSortValue(atomValue);
    handleAddClientParamsRoute(
      searchParams,
      router,
      pathname,
      "sort",
      atomValue
    );
  };

  const handleFilter = (checked: Checkbox.CheckedState, filter: string) => {
    if (checked) {
      setFilterValue((prev) => [...prev, filter]);
      return;
    }
    setFilterValue((prev) => prev.filter((item) => item !== filter));
  };

  return (
    <Flex justify="between" mx="4" mb="4">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline">
            Filter
            <ListFilter />
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-50  backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <Dialog.Content className=" fixed z-50  p-6 bg-panel-translucent shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm">
            <Dialog.Close className="absolute top-2 right-2">
              <XCircle />
            </Dialog.Close>
            <Dialog.Title>Logo</Dialog.Title>
            <ScrollArea>
              {categories.map((category, index) => (
                <Flex direction="column" key={index} mt="4" gap="2">
                  <Flex mt="4" gap="2">
                    <Checkbox.Root
                      onCheckedChange={(checked) =>
                        handleFilter(checked, `category = '${category.key}'`)
                      }
                      className=" data-[state=unchecked]:border-2 data-[state=unchecked]:border-accent-9 data-[state=checked]:bg-accent-9  flex h-6 w-6   items-center justify-center rounded-3 "
                    >
                      <Checkbox.Indicator className="text-crimson-9-contrast">
                        <Check size={16} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <Text size="4" as="label">
                      {category.key}
                    </Text>
                  </Flex>
                  {category.subCategories.length > 0 &&
                    category.subCategories.map((subcategory, index) => (
                      <Flex ml="4" key={index} mt="4" gap="2">
                        <Checkbox.Root
                          onCheckedChange={(checked) =>
                            handleFilter(
                              checked,
                              `subcategory = '${subcategory.key}'`
                            )
                          }
                          className=" data-[state=unchecked]:border-2 data-[state=unchecked]:border-accent-9 data-[state=checked]:bg-accent-9  flex h-6 w-6   items-center justify-center rounded-3 "
                        >
                          <Checkbox.Indicator className="text-crimson-9-contrast">
                            <Check size={16} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <Text size="4" as="label">
                          {subcategory.key}
                        </Text>
                      </Flex>
                    ))}
                </Flex>
              ))}
              <Flex justify="end">
                <Button mb="4" mr="4" variant="outline" mt="4">
                  Apply Filters
                </Button>
              </Flex>
            </ScrollArea>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Root>
      <Select.Root onValueChange={handleSort} defaultValue={"null"}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sort</Select.Label>
            <Select.Item value="null">Relevant</Select.Item>
            <Select.Item value="price:desc">Price High to Low</Select.Item>
            <Select.Item value="price:asc">Price Low to High</Select.Item>
            <Select.Item value="updatedat:asc">Most Recent</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default FilterSort;
