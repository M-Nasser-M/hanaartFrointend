import { envVariables } from "@/types/envVars";
import axios from "axios";

export const serverApi = axios.create({
  baseURL: envVariables.STRAPI_API_URL,
  headers: { Authorization: `bearer ${envVariables.STRAPI_API_TOKEN}` },
});

export const clientApi = axios.create({ baseURL: envVariables.STRAPI_API_URL });
