"use client";
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useCart } from "@/lib/hooks/useCart";
import Image from "next/image";
import { arrayRange } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { cartTranslations } from "../../../../messages/messagesKeys";
import NextLink from "@/components/NextLink";

type Props = { translations: cartTranslations };

const CartList = ({ translations }: Props) => {
  const { cartValue, removeFromCart, changeQuantity, total } = useCart();

  const [parent] = useAutoAnimate();

  if (cartValue && cartValue.length > 0)
    return (
      <>
        <Flex className="md:w-2/3">
          <Flex ref={parent} width="100%" gap="4" direction="column">
            {cartValue.map((item) => {
              return (
                <Card key={item.product.id}>
                  <Flex width="100%" direction="row" gap="4">
                    <Image
                      src={item.product.cover.formats.thumbnail?.url || ""}
                      alt={item.product.cover.alternativeText || ""}
                      width={item.product.cover.formats.thumbnail?.width || 0}
                      height={item.product.cover.formats.thumbnail?.height || 0}
                    />
                    <Flex direction="column" gap="4">
                      <Heading color="crimson" as="h1">
                        {item.product.name}
                      </Heading>
                      <Text>{item.product.description}</Text>
                      <Text>{item.product.price} L.E</Text>
                      <Flex direction="row" gap="4">
                        <Select.Root
                          onValueChange={(val) => {
                            changeQuantity(item.product.id, Number(val));
                          }}
                          defaultValue={String(item.quantity)}
                        >
                          <Select.Trigger />
                          <Select.Content position="popper">
                            {arrayRange(
                              1,
                              Number(item.product.availableStock),
                              1
                            ).map((val) => (
                              <Select.Item key={val} value={String(val)}>
                                {val}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                        <Button onClick={() => removeFromCart(item.product.id)}>
                          {translations.remove}
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
          </Flex>
        </Flex>
        <Card className="h-fit md:w-1/3">
          <Flex direction="column" gap="4" justify="center">
            {cartValue.map((item) => {
              return (
                <Flex key={item.product.id} direction="column" gap="4">
                  <Flex direction="row" justify="between" gap="4">
                    <Text as="label">Name:</Text>
                    <Text>{item.product.name}</Text>
                  </Flex>
                  <Flex direction="row" justify="between" gap="4">
                    <Text as="label">Quantity:</Text>
                    <Text>{item.quantity}</Text>
                  </Flex>
                  <Flex direction="row" justify="between" gap="4">
                    <Text as="label">Price:</Text>
                    <Text>{item.product.price * item.quantity} L.E</Text>
                  </Flex>
                  <Separator className="w-full" />
                </Flex>
              );
            })}
            <Flex direction="row" justify="between" gap="4">
              <Text as="label">Total:</Text>
              <Text>{total} L.E</Text>
            </Flex>
            <NextLink className="self-center" href="/checkout">
              <Button>Proceed To Checkout</Button>
            </NextLink>
          </Flex>
        </Card>
      </>
    );

  return (
    <Flex justify="center" align="center">
      <Heading color="crimson" as="h1">
        {translations.cartempty}
      </Heading>
    </Flex>
  );
};

export default CartList;
