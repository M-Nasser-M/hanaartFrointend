import type { localStorageCartItem, localStorageCartItems } from "@/types/user";
import { useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { cartAtom, sessionAtom } from "@/atoms/atoms";
import {
  addCartItem,
  removeCartItemUsingProductId,
} from "@/services/serverActions/CartActions";

export const useCart = () => {
  const cartValue = useAtomValue(cartAtom);
  const setCart = useSetAtom(cartAtom);
  const session = useAtomValue(sessionAtom);

  const useHydrateCart = (HydrateValue: localStorageCartItems) =>
    useHydrateAtoms([[cartAtom, HydrateValue]]);

  const addToCart = (cartItem: localStorageCartItem) => {
    if (session) addCartItem(cartItem.product.id, cartItem.quantity, session);
    setCart([
      cartItem,
      ...cartValue.filter((item) => item.product.id !== cartItem.product.id),
    ]);
  };

  const changeQuantity = (productId: number, quantity: number) => {
    if (session) addCartItem(productId, quantity, session);
    setCart(
      cartValue.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (productId: number) => {
    if (session) removeCartItemUsingProductId(productId, session);
    setCart(cartValue.filter((cartItem) => cartItem.product.id !== productId));
  };

  const total = cartValue.reduce((acc, item) => {
    return (
      acc +
      (item.product.offer_price
        ? +item.product.offer_price
        : +item.product.price) *
        +item.quantity
    );
  }, 0);

  return {
    cartValue,
    useHydrateCart,
    addToCart,
    removeFromCart,
    changeQuantity,
    setCart,
    total,
  };
};
