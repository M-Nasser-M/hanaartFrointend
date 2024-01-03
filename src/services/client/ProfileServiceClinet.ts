import type { Session } from "@/types/sharedTypes";
import type { Email, Phone } from "@/types/user";
import { clientApi } from "./ClientApi";

export const updateEmail = async (email: Email, session: Session) => {
  try {
    const response = await clientApi.put(
      `/users/${session.user.id}`,
      {
        primaryEmail: email,
      },
      { headers: { Authorization: `Bearer ${session.jwt}` } }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
};

export const updatePhone = async (phone: Phone, session: Session) => {
  try {
    const response = await clientApi.put(
      `/users/${session.user.id}`,
      {
        phone: phone,
      },
      { headers: { Authorization: `Bearer ${session.jwt}` } }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    }
  }
};
