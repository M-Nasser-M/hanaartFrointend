import { object, string, Input, parse } from "valibot";

const envVariablesSchema = object({
  I18NEXUS_API_KEY: string(),
  STRAPI_API_URL: string(),
  STRAPI_URL: string(),
  STRAPI_API_TOKEN: string(),
});

export const envVariables = parse(envVariablesSchema, process.env);
