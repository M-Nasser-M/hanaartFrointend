import { clientEnv } from "@/clientEnv";
import createFetchApi from "@/lib/CreateFetchApi";

export const meiliClientApi = createFetchApi(clientEnv.NEXT_PUBLIC_MEILI_HOST, {
  headers: {
    Authorization: `Bearer ${clientEnv.NEXT_PUBLIC_MEILI_MASTER_KEY}`,
    "Content-Type": "application/json",
  },
});

export const clienthApi = createFetchApi(clientEnv.NEXT_PUBLIC_STRAPI_API_URL, {
  headers: { "Content-Type": "application/json" },
});
