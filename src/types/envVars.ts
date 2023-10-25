import { object, string, Input, parse } from "valibot";

const envVariablesSchema = object({
  I18NEXUS_API_KEY: string(),
  STRAPI_API_URL: string(),
  STRAPI_URL: string(),
  STRAPI_API_TOKEN: string(),
  NEXTAUTH_URL: string(),
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  NEXTAUTH_SECRET: string(),
  FACEBOOK_CLIENT_ID: string(),
  FACEBOOK_CLIENT_SECRET: string(),
  INSTAGRAM_CLIENT_ID: string(),
  INSTAGRAM_CLIENT_SECRET: string(),
});

export const envVariables = parse(envVariablesSchema, process.env);
