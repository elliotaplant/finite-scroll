import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getThemePreference } from "@/lib/theme";
import ThemeToggle from "@/components/ThemeToggle";
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
  title: "Finite Scroll - Reddit & Twitter without infinite scroll",
  description: "View Reddit and Twitter/X content without infinite scroll distractions or excessive media",
  keywords: ["reddit", "twitter", "x", "scroll", "finite", "social media"],
};

// Get the theme from cookies, but default to 'light' if not set
async function getInitialTheme() {
  const theme = await getThemePreference();
  // Just return 'light' or 'dark', no 'system'
  return theme === 'dark' ? 'dark' : 'light';
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme = await getInitialTheme();
  
  return (
    <html lang="en" className={initialTheme}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle initialTheme={initialTheme} />
        </div>
        {children}
      </body>
    </html>
  );
}
