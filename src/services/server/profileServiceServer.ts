import type { Email, UserProfile } from "@/types/user";
import { serverApiAuth } from "../client/ServerApi";
import qs from "qs";
import { clientApi } from "../client/ClientApi";
import { Session } from "@/types/sharedTypes";

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
    return response.data;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error fetching data"
    );

    return null;
  }
};
