import type { IronSessionOptions } from "iron-session";

export type User = {
  isLoggedIn: boolean;
  tokenBalance: number;
};

export const sessionOptions: IronSessionOptions = {
  password:
    (process.env.SECRET_COOKIE_PASSWORD as string) ||
    "https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/fetchJson.ts",
  cookieName: "nftism-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
