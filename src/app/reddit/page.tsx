import { fetchRedditContent } from "@/lib/reddit";
import RedditPost from "@/components/RedditPost";
import RedditComment from "@/components/RedditComment";
import Link from "next/link";
import { RedditCommentData } from "@/types/reddit";

interface PageProps {
  searchParams: Promise<{ url?: string }>;
}

export default async function RedditPage({ searchParams }: PageProps) {
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
        <h1 className="text-2xl font-bold mb-4">Reddit Viewer</h1>
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg">
          <p className="text-center mb-4">
            No URL provided. Please go back to the home page and enter a Reddit
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
    // Fetch the Reddit content on the server
    const redditData = await fetchRedditContent(url);

    // Process the response
    if (
      !Array.isArray(redditData) ||
      redditData.length < 2 ||
      redditData[0].data.children.length === 0
    ) {
      throw new Error("Invalid Reddit data format");
    }

    const post = redditData[0].data.children[0].data;
    const comments = redditData[1].data.children
      .filter((comment) => comment.kind !== "more") // Filter out "load more" placeholders
      .map((comment) => comment.data);

    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold mb-4">Reddit Viewer</h1>
        </div>

        <RedditPost post={post} />

        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="text-xl font-bold">Comments ({comments.length})</h2>

          {/* Add more controls here if needed, like sorting options */}
        </div>

        {comments.length > 0 ? (
          <div>
            {comments.map((comment: RedditCommentData) => (
              <RedditComment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
            <p className="text-gray-500">No comments yet.</p>
          </div>
        )}
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
        <h1 className="text-2xl font-bold mb-4">Reddit Viewer</h1>
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
            <li>The URL is not a valid Reddit post URL</li>
            <li>The Reddit post doesn&apos;t exist or has been removed</li>
            <li>There was an issue connecting to Reddit</li>
          </ul>
        </div>
      </div>
    );
  }
}
