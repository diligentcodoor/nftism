import type { IronSessionOptions } from "iron-session";
import { NFTISM_TOKEN_THRESHOLD } from "./constants";

export enum UserRole {
  NOT_LOGGED_IN = "not_logged_in", // Not Logged In
  GUEST = "guest", // Logged in, less than 100 NFTism tokens
  MEMBER = "member", // Logged in, more than 100 NFTism tokens
}

export interface IUser {
  isLoggedIn: boolean;
  tokenBalance: number;
  role: () => UserRole;
}

export class User implements IUser {
  constructor(
    public readonly isLoggedIn: boolean,
    public readonly tokenBalance: number
  ) {}

  public role(): UserRole {
    if (!this.isLoggedIn) {
      return UserRole.NOT_LOGGED_IN;
    }
    if (this.tokenBalance < NFTISM_TOKEN_THRESHOLD) {
      return UserRole.GUEST;
    }
    return UserRole.MEMBER;
  }
}

export const getRoleProps = async (
  _user: User | undefined,
  successProps: any,
  failureProps: any
): Promise<any> => {
  const user = new User(_user?.isLoggedIn ?? false, _user?.tokenBalance ?? 0);

  switch (user.role()) {
    case undefined:
    case UserRole.NOT_LOGGED_IN:
      return {
        props: {
          errorCode: 401,
          errorMsg: "Please login and acquire 100 NFTism to access this page",
          ...failureProps,
        },
      };
    case UserRole.GUEST:
      return {
        props: {
          errorCode: 403,
          errorMsg: "Please acquire 100 NFTism to access this page",
          ...failureProps,
        },
      };
    case UserRole.MEMBER:
      const evaluatedProps = await Object.entries(successProps).reduce(
        async (props, [propKey, propValue]) => {
          if (typeof propValue === "function") {
            const evaluatedProp = await propValue();
            if (!evaluatedProp) return { notFound: true };
            return { ...props, [propKey]: evaluatedProp };
          }
          return { ...props, [propKey]: propValue };
        },
        successProps
      );
      if ("notFound" in evaluatedProps) {
        return { notFound: true };
      }
      return {
        props: {
          errorCode: -1,
          errorMsg: "",
          ...evaluatedProps,
        },
      };
  }
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
