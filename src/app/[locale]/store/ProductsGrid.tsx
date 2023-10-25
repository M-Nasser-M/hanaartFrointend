import { Locale } from "@/types/sharedTypes";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Inset,
  Text,
} from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ProductsGrid = () => {
  const t = useTranslations("store");
  return (
    <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="3" width="100%">
      <Card>
        <Inset clip="padding-box" side="top" pb="current">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt=""
              fill
              src="https://images.pexels.com/photos/5929944/pexels-photo-5929944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </AspectRatio>
        </Inset>
        <Heading size="6" as="h3">
          title
        </Heading>
        <Text size="4" as="p">
          description
        </Text>
        <Flex justify="between">
          <Heading as="h3">599 {t("currency")}</Heading>
          <Button>{t("addtocart")}</Button>
        </Flex>
      </Card>
    </Grid>
  );
};

export default ProductsGrid;
