import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";
import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AdapterUser } from "next-auth/adapters";

import type { JWT } from "next-auth/jwt";
import { ENV } from "@/types/envVarsServer";
import { serverApiAuth } from "@/services/client/ServerApi";

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: ENV.FACEBOOK_CLIENT_ID,
      clientSecret: ENV.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: ENV.INSTAGRAM_CLIENT_ID,
      clientSecret: ENV.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      const extendedSession = {
        ...session,
        user: { ...session.user, id: token.id },
        jwt: token.jwt,
      };

      return extendedSession;
    },
    jwt: async ({ token, user, account }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await serverApiAuth.get<{
          jwt: JWT;
          user: User | AdapterUser;
        }>(
          `/auth/${account?.provider}/callback?access_token=${account?.access_token}`
        );

        token.jwt = response.data.jwt;
        token.id = response.data.user.id;
      }
      return token;
    },
    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
