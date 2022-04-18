import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getUserById } from "~/models/user.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "user";

type UserSession = {
  id: string;
  githubAccessToken: string;
};

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getSignedIn(request: Request) {
  const session = await getSession(request);
  const userSession = session.get(USER_SESSION_KEY) as UserSession | undefined;
  if (!userSession) {
    return null;
  }
  const user = await getUserById(userSession.id);
  return user;
}

export async function requireSignedIn(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const user = await getSignedIn(request);
  if (!user) {
    const session = await getSession(request);
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/index?${searchParams}`, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  }
  return user;
}

export async function createUserSession({
  request,
  userSession,
  remember,
  redirectTo,
}: {
  request: Request;
  userSession: UserSession;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userSession);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}
