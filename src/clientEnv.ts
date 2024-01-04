import { string, object, parse } from "valibot";

const clientEnvSchema = object({
  NEXT_PUBLIC_MEILI_HOST: string(),
  NEXT_PUBLIC_MEILI_MASTER_KEY: string(),
  NEXT_PUBLIC_STRAPI_API_URL: string(),
  NEXT_PUBLIC_STRAPI_API_TOKEN: string(),
});

const variables = {
  NEXT_PUBLIC_MEILI_HOST: process.env.NEXT_PUBLIC_MEILI_HOST,
  NEXT_PUBLIC_MEILI_MASTER_KEY: process.env.NEXT_PUBLIC_MEILI_MASTER_KEY,
  NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  NEXT_PUBLIC_STRAPI_API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
};

const parsedEnv = parse(clientEnvSchema, variables);

export const clientEnv = parsedEnv;
