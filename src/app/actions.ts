"use server";

import { cookies } from "next/headers";

// Cookie name for theme preference
const THEME_COOKIE_NAME = "theme-preference";

// Set theme preference in cookies (server action)
export async function setThemePreference(theme: "light" | "dark") {
  const cookieStore = await cookies();

  // Set the cookie with a 1-year expiration
  cookieStore.set({
    name: THEME_COOKIE_NAME,
    value: theme,
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
    sameSite: "lax",
  });

  return theme;
}
