import type { IronSessionOptions } from "iron-session";

export type User = {
  isLoggedIn: boolean;
  tokenBalance: number;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "nftism-session",
  cookieOptions: {
    maxAge: 3600 * 24, // 24 hr session
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
