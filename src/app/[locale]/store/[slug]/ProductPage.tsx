"use client";
import { AspectRatio, Box, Button, Flex, Heading } from "@radix-ui/themes";
import { ProductData } from "@/types/product";
import Image from "next/image";
import React from "react";

type Props = { product: ProductData };

const ProductPage = ({ product }: Props) => {
  return (
    <Flex gap="4" direction={{ initial: "column", md: "row" }}>
      <Box className="w-[70%]">
        <AspectRatio ratio={16 / 9}>
          <Image
            alt={product.cover.alternativeText || "cover image"}
            src={product.cover.url}
            fill
          />
        </AspectRatio>
      </Box>
      <Flex direction="column" gap="4" className="w-[30%]">
        <Heading color="crimson" highContrast>
          {product.name}
        </Heading>
        <Heading>{product.price}</Heading>
        <Button variant="outline" className="w-full">
          Add To Cart
        </Button>
        <Heading>{product.description}</Heading>
      </Flex>
    </Flex>
  );
};

export default ProductPage;
