import axios from "axios";

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

export const meiliClientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEILI_HOST,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEILI_MASTER_KEY}`,
  },
});
