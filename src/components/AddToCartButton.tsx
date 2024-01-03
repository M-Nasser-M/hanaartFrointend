"use client";

import type { ProductSearchResponseElement } from "@/types/product";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@radix-ui/themes";

type Props = {
  translation: string;
  product: ProductSearchResponseElement;
  quantity: number;
};

const AddToCartButton = ({ translation, product, quantity }: Props) => {
  const { addToCart } = useCart();
  return (
    <Button variant="outline" onClick={() => addToCart({ product, quantity })}>
      {translation}
    </Button>
  );
};

export default AddToCartButton;
