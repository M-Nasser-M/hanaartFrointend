import { string, object, parse, url, coerce, number } from "valibot";

const clientEnvSchema = object({
  NEXT_PUBLIC_MEILI_HOST: string([url()]),
  NEXT_PUBLIC_MEILI_MASTER_KEY: string(),
  NEXT_PUBLIC_STRAPI_API_URL: string([url()]),
  NEXT_PUBLIC_STRAPI_API_TOKEN: string(),
  NEXT_PUBLIC_PAYMOB_API_KEY: string(),
  NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL: string([url()]),
  NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL: string([url()]),
  NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL: string([url()]),
  NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL: string([url()]),
  NEXT_PUBLIC_PAYMOB_IFRAME_URL: string([url()]),
  NEXT_PUBLIC_IFRAME_ID: coerce(number(), Number),
  NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID: coerce(number(), Number),
  NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID: coerce(number(), Number),
  NEXT_PUBLIC_PAYMOB_HMAC_SECRET: string(),
});

const variables = {
  NEXT_PUBLIC_MEILI_HOST: process.env.NEXT_PUBLIC_MEILI_HOST,
  NEXT_PUBLIC_MEILI_MASTER_KEY: process.env.NEXT_PUBLIC_MEILI_MASTER_KEY,
  NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
  NEXT_PUBLIC_PAYMOB_API_KEY: process.env.NEXT_PUBLIC_PAYMOB_API_KEY,
  NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL:
    process.env.NEXT_PUBLIC_PAYMOB_AUTH_TOKEN_URL,
  NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL:
    process.env.NEXT_PUBLIC_PAYMOB_CREATE_ORDER_URL,
  NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL:
    process.env.NEXT_PUBLIC_PAYMOB_PAYMENT_KEY_URL,
  NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL:
    process.env.NEXT_PUBLIC_PAYMOB_MOBILE_PAY_URL,
  NEXT_PUBLIC_PAYMOB_IFRAME_URL: process.env.NEXT_PUBLIC_PAYMOB_IFRAME_URL,
  NEXT_PUBLIC_IFRAME_ID: process.env.NEXT_PUBLIC_IFRAME_ID,
  NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID:
    process.env.NEXT_PUBLIC_PAYMOB_CARD_PAYMENT_INTEGRATION_ID,
  NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID:
    process.env.NEXT_PUBLIC_PAYMOB_MOBILE_PAYMENT_INTEGRATION_ID,
  NEXT_PUBLIC_PAYMOB_HMAC_SECRET: process.env.NEXT_PUBLIC_PAYMOB_HMAC_SECRET,
};

const parsedEnv = parse(clientEnvSchema, variables);

export const clientEnv = parsedEnv;
