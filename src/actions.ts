import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "../src/lib";
import { cookies } from "next/headers";
import { defaultSession } from "@/lib";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const login = async () => {};

export const logout = async () => {};
