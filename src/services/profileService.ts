import qs from "qs";
import { serverApi, serverApiAuth } from "./ServerApi";

export const getUserProfile = async (id: number, jwt: string) => {
  const queryString = qs.stringify({
    populate: { addresses: true, orders: true, cart: { populate: "products" } },
  });

  try {
    const response = await serverApiAuth.get(`/users/${id}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "error fetching data"
    );

    return null;
  }
};
