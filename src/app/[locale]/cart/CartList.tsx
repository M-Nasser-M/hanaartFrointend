"use client";
import { useCart } from "@/lib/hooks/useCart";
import { AspectRatio, Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const CartList = () => {
  const { cartValue } = useCart();
  console.log(cartValue);
  if (cartValue && cartValue.length > 0)
    return (
      <Flex
        direction={{ initial: "column", md: "row" }}
        justify={{ initial: "center", md: "between" }}
      >
        <Flex direction="column" gap="4">
          <Heading as="h3">Product 2</Heading>
          <AspectRatio ratio={16 / 9}>
            <Image
              sizes="100vw"
              alt="alt"
              fill
              src="https://images.unsplash.com/photo-1701352281550-4a7b283df099?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </AspectRatio>
        </Flex>
        <Heading as="h4">Quantity</Heading>
      </Flex>
    );
  return (
    <Flex justify="center" align="center">
      <Heading color="crimson" as="h1">
        your Cart is Empty
      </Heading>
    </Flex>
  );
};

export default CartList;
