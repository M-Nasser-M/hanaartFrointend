import { ShoppingCart } from "lucide-react";
import { Button } from "@radix-ui/themes";
import NextLink from "../NextLink";
import React from "react";

const CartButton = () => {
  return (
    <NextLink href={`/cart`}>
      <Button size="2" mr="2" variant="outline">
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </NextLink>
  );
};

export default CartButton;
