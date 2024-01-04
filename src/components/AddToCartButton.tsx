"use client";

import type { ProductSearchResponseElement } from "@/types/product";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@radix-ui/themes";
import { toast } from "sonner";

type Props = {
  translation: string;
  product: ProductSearchResponseElement;
  quantity: number;
};

const AddToCartButton = ({ translation, product, quantity }: Props) => {
  const { addToCart } = useCart();

  return (
    <Button
      variant="outline"
      onClick={() =>
        +product.availableStock > 0
          ? addToCart({ product, quantity })
          : toast("Error Adding Product", {
              description: "reason: out of stock",
              action: { label: "dismiss", onClick: () => toast.dismiss() },
            })
      }
    >
      {translation}
    </Button>
  );
};

export default AddToCartButton;
