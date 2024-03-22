"use server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "../src/lib";
import { cookies } from "next/headers";
import { defaultSession } from "@/lib";
import { redirect } from "next/navigation";

let username = "John";
let isPro = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const login = async (formData: FormData) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // Check user in the db
  // const user = await.db.getUser({username,password})

  if (formUsername !== username) {
    return {
      error: "wrong credentials",
    };
  }

  session.userId = "1";
  session.username = formUsername;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
