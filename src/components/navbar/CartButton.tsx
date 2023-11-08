import { Button, HoverCard } from "@radix-ui/themes";
import { ShoppingCart } from "lucide-react";
import NextLink from "../NextLink";
import React from "react";

const CartButton = () => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <NextLink href={`/cart`}>
          <Button size="2" mr="2" variant="outline">
            <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </NextLink>
      </HoverCard.Trigger>
      <HoverCard.Content sideOffset={5} align="end">
        <p>Cart</p>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default CartButton;
