import Link from "next/link";
import { fetchTwitterContent } from "@/lib/twitter";
import TwitterPost from "@/components/TwitterPost";

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

  try {
    // Fetch the Twitter/X content on the server
    const twitterData = await fetchTwitterContent(url);

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

        <TwitterPost
          tweet={twitterData.tweet}
          user={twitterData.user}
          media={twitterData.media}
        />

        {/* We could add replies here in the future when we get access to them */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="text-xl font-bold">Replies</h2>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
          <p className="text-gray-500">
            Replies are not available through the current API.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold mb-4">Twitter/X Viewer</h1>
        <div className="p-8 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error Loading Content
          </h2>
          <p className="text-red-600 dark:text-red-400">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <p className="mt-4">This could be because:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>The URL is not a valid Twitter/X tweet URL</li>
            <li>The tweet doesn&apos;t exist or has been removed</li>
            <li>There was an issue connecting to Twitter/X</li>
          </ul>
        </div>
      </div>
    );
  }
}
