import ThemeToggle from "@/components/ThemeToggle";
import { THEME_COOKIE_NAME } from "@/lib/theme";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finite Scroll",
  description: "View Reddit and Twitter/X posts without distractions",
  keywords: ["reddit", "twitter", "x", "scroll", "finite", "social media"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);

  // Default to light if no cookie is set
  const theme =
    (themeCookie?.value as "light" | "dark") === "dark" ? "dark" : "light";

  return (
    <html lang="en" className={theme}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans`}
      >
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle initialTheme={theme} />
        </div>
        {children}
      </body>
    </html>
  );
}
