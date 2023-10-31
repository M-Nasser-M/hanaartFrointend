import { Input, object, parse, string } from "valibot";

const ENVSCHEMA = object({
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
  MEILI_HOST: string(),
  MEILI_MASTER_KEY: string(),
  NEXT_PUBLIC_MEILI_HOST: string(),
  NEXT_PUBLIC_MEILI_MASTER_KEY: string(),
  NEXT_PUBLIC_STRAPI_API_URL: string(),
});

export const ENV = parse(ENVSCHEMA, process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Input<typeof ENVSCHEMA> {}
  }
}
