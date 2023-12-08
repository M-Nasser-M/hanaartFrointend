import type { Session } from "@/types/sharedTypes";
import { serverApiAuth } from "./ServerApi";
import type { Cart } from "@/types/user";
import qs from "qs";

export const getCart = async (session: Session) => {
  const queryString = qs.stringify({
    populate: { cart_items: { populate: "product" } },
  });
  try {
    const response = await serverApiAuth.get<Cart>(
      `/carts/${session.user.cartId}?${queryString}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  try {
    const response = await serverApiAuth.put(`/cart-items/${cartItemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const createCartItem = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  try {
    const response = await serverApiAuth.post(`/cart-items`, {
      cart: cartId,
      product: productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const createCart = async (userId: number) => {
  try {
    const response = await serverApiAuth.post<Cart>("/carts", {
      users_permissions_user: userId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
