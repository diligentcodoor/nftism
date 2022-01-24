import { User } from "@lib/session";
import fetchJson from "./fetchJson";

export const fetchUser = async (): Promise<User> => {
  const user: User = await fetchJson("/api/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return user;
};
