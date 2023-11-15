import { ENV } from "@/types/envVarsServer";
import axios from "axios";

export const serverApiAuth = axios.create({
  baseURL: ENV.STRAPI_API_URL,
  headers: { Authorization: `bearer ${ENV.STRAPI_API_TOKEN}` },
});

export const serverApi = axios.create({
  baseURL: ENV.STRAPI_API_URL,
});

export const meiliserverApiAuth = axios.create({
  baseURL: ENV.MEILI_HOST,
  headers: { Authorization: ENV.MEILI_MASTER_KEY },
});
