import { IUser, User } from "@lib/session";
import { SiweMessage } from "siwe";
import fetchJson from "./fetchJson";

export const fetchUser = async (): Promise<User> => {
  const userResponse: IUser = await fetchJson("/api/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return new User(userResponse.isLoggedIn, userResponse.tokenBalance);
};

export const fetchLogin = async (
  message: SiweMessage,
  signature: string
): Promise<User> => {
  const userResponse: IUser = await fetchJson("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });

  return new User(userResponse.isLoggedIn, userResponse.tokenBalance);
};
