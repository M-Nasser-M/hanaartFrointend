import { string, object, safeParse } from "valibot";

const serverEnvSchema = object({
  I18NEXUS_API_KEY: string(),
  STRAPI_API_URL: string(),
  STRAPI_API_TOKEN: string(),
  STRAPI_URL: string(),
  NEXTAUTH_URL: string(),
  GOOGLE_CLIENT_ID: string(),
  GOOGLE_CLIENT_SECRET: string(),
  NEXTAUTH_SECRET: string(),
  FACEBOOK_CLIENT_ID: string(),
  FACEBOOK_CLIENT_SECRET: string(),
  INSTAGRAM_CLIENT_ID: string(),
  INSTAGRAM_CLIENT_SECRET: string(),
  MEILI_HOST: string(),
  MEILI_MASTER_KEY: string(),
});

const parsedEnv = safeParse(serverEnvSchema, process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.issues);
}

export const serverEnv = parsedEnv.output;
