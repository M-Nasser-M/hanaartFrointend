import type { localStorageCartItem } from "@/types/user";
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

  const useHydrateCart = (HydrateValue: localStorageCartItem[]) =>
    useHydrateAtoms([[cartAtom, HydrateValue]]);

  const addToCart = (cartItem: localStorageCartItem) => {
    if (session) addCartItem(cartItem.product.id, cartItem.quantity, session);
    //loop throudh cart check if item already exists using product id then update quantity
    setCart([
      ...cartValue.filter((item) => item.product.id !== cartItem.product.id),
      cartItem,
    ]);
  };

  const removeFromCart = (productId: number) => {
    if (session) removeCartItemUsingProductId(productId, session);
    setCart(cartValue.filter((cartItem) => cartItem.product.id === productId));
  };

  return { cartValue, useHydrateCart, addToCart, removeFromCart };
};
