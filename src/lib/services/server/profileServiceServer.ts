import type { UserProfile } from "@/types/user";
import { serverApiAuth } from "./ServerApi";
import qs from "qs";

export const getUserProfile = async (id: number) => {
  const queryString = qs.stringify({
    populate: {
      addresses: true,
      orders: true,
      cart: { populate: { cart_items: { poulate: "product" } } },
    },
  });

  try {
    const response = await serverApiAuth.get<UserProfile>(
      `/users/${id}?${queryString}`
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error fetching data"
    );

    return null;
  }
};
