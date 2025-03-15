import ThemeToggle from "@/components/ThemeToggle";
import { THEME_COOKIE_NAME } from "@/lib/theme";
import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#4A90E2',
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  title: "Finite Scroll - Reddit & Twitter without infinite scroll",
  description: "View Reddit and Twitter/X posts without infinite scroll distractions or excessive media",
  keywords: ["reddit", "twitter", "x", "scroll", "finite", "social media"],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Finite Scroll",
  },
  applicationName: "Finite Scroll",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://finite-scroll.elliotplant.com"),
  openGraph: {
    type: "website",
    siteName: "Finite Scroll",
    title: "Finite Scroll - Reddit & Twitter without infinite scroll",
    description: "View Reddit and Twitter/X posts without infinite scroll distractions",
    images: [{ url: "/android-chrome-512x512.png" }],
  },
  twitter: {
    card: "summary",
    title: "Finite Scroll",
    description: "Reddit & Twitter without infinite scroll distractions",
    images: [{ url: "/android-chrome-512x512.png" }],
  },
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
