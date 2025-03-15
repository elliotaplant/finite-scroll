import { cookies } from 'next/headers';

// Cookie name for theme preference
const THEME_COOKIE_NAME = 'theme-preference';

// Get theme preference from cookies (server-side)
export async function getThemePreference(): Promise<'light' | 'dark'> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);
  
  // Default to light if no cookie is set
  return (themeCookie?.value as 'light' | 'dark') === 'dark' ? 'dark' : 'light';
}