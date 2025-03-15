import { TwitterResponse } from "@/types/twitter";

// Function to fetch Twitter/X content
export async function fetchTwitterContent(
  url: string
): Promise<TwitterResponse> {
  // Extract the path from the Twitter/X URL
  const twitterUrl = new URL(url);
  const path = twitterUrl.pathname;

  // Check if this is a tweet URL (contains /status/ in the path)
  if (!path.includes("/status/")) {
    throw new Error("URL is not a valid Twitter/X tweet URL");
  }

  // Extract tweet ID from the path
  const statusMatch = path.match(/\/status\/([0-9]+)/);
  if (!statusMatch || !statusMatch[1]) {
    throw new Error("Could not extract tweet ID from URL");
  }

  const tweetId = statusMatch[1];

  // For now, we'll use a simple approach with fxtwitter.com as a proxy
  // This is a public service that returns tweet data in a readable format
  const apiUrl = `https://api.fxtwitter.com/status/${tweetId}`;

  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "finite-scroll/0.1.0",
    },
    // Cache for 60 seconds
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Twitter/X: ${response.statusText}`);
  }

  const data = await response.json();

  // Transform the fxtwitter response into our app's format
  return {
    tweet: {
      id: data.tweet.id,
      text: data.tweet.text,
      created_at: data.tweet.created_at,
      author_id: data.tweet.author.id,
    },
    user: {
      id: data.tweet.author.id,
      name: data.tweet.author.name,
      username: data.tweet.author.screen_name,
      profile_image_url: data.tweet.author.avatar_url,
    },
    media: data.tweet.media?.all || [],
    // We don't get replies in this API
    replies: [],
  };
}
