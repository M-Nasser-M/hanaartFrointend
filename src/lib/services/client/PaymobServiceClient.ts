import { clientEnv } from "@/clientEnv";
import { clientApi } from "./ClientApi";
import type {
  PaymobAuthResponse,
  PaymobCreateOrderPayload,
  PaymobCreateOrderResponse,
  PaymobMobileWalletPayload,
  PaymobMobileWalletResponse,
  PaymobPaymentKeysPayload,
  PaymobPaymentKeysResponse,
} from "@/lib/types/paymob";

export const authenticatePaymob = async () => {
  try {
    const response = await clientApi.post<PaymobAuthResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL,
      { apikey: clientEnv.NEXT_PUBLIC_PAYMOB_API_KEY }
    );
    return response;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "error auth Paymob");
    return null;
  }
};

export const createOrder = async (
  paymobCreateOrderPayload: PaymobCreateOrderPayload
) => {
  try {
    const response = await clientApi.post<PaymobCreateOrderResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL,
      paymobCreateOrderPayload
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "paymob order Creation Error"
    );
    return null;
  }
};

export const getPaymentKey = async (
  paymobPaymentKeysPayloab: PaymobPaymentKeysPayload
) => {
  try {
    const response = await clientApi.post<PaymobPaymentKeysResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL,
      paymobPaymentKeysPayloab
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "paymob payment key  Error"
    );
    return null;
  }
};

export const getMobileWalletPaymentLink = async (
  paymobMobileWalletPayload: PaymobMobileWalletPayload
) => {
  try {
    const response = await clientApi.post<PaymobMobileWalletResponse>(
      clientEnv.NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL,
      paymobMobileWalletPayload
    );
    return response;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "paymob mobile payment Error"
    );
    return null;
  }
};
