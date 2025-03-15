import Link from "next/link";
import { fetchTwitterContent } from "@/lib/twitter";

interface PageProps {
  searchParams: Promise<{ url?: string }>;
}

export default async function TwitterPage({ searchParams }: PageProps) {
  // In Next.js 15, searchParams is now async and must be awaited
  const { url } = await searchParams;

  if (!url) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold mb-4">Twitter/X Viewer</h1>
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg">
          <p className="text-center mb-4">
            No URL provided. Please go back to the home page and enter a Twitter
            URL.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For now, just show a coming soon page
  // Later we'll implement the actual Twitter API integration
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold mb-4">Twitter/X Viewer</h1>
      </div>

      <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Coming Soon!</h2>
        <p className="mb-4">
          Twitter/X content viewing will be implemented in a future update.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We'll be working on integrating with the Twitter/X API to fetch tweets
          and their replies.
        </p>
      </div>
    </div>
  );
}
