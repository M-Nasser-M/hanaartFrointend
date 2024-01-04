import createFetchApi from "@/lib/CreateFetchApi";
import { serverEnv } from "@/serverEnv";
import axios from "axios";

export const serverApiAuth = axios.create({
  baseURL: serverEnv.STRAPI_API_URL,
  headers: {
    Authorization: `bearer ${serverEnv.STRAPI_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const serverApi = createFetchApi(serverEnv.STRAPI_API_URL, {
  headers: { "Content-Type": "application/json" },
});

export const meiliserverApiAuth = createFetchApi(serverEnv.MEILI_HOST, {
  headers: {
    Authorization: `Bearer ${serverEnv.MEILI_MASTER_KEY}`,
    "Content-Type": "application/json",
  },
});
