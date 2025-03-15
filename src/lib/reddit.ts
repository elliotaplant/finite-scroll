import { RedditResponse } from "@/types/reddit";

// Function to fetch Reddit content on the server
export async function fetchRedditContent(url: string): Promise<RedditResponse> {
  // Extract the path from the Reddit URL
  const redditUrl = new URL(url);
  const path = redditUrl.pathname;
  
  // Append .json to get the Reddit JSON API response
  const apiUrl = `https://www.reddit.com${path}.json`;
  
  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "finite-scroll/0.1.0",
    },
    // Ensure the data is fresh
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from Reddit: ${response.statusText}`);
  }
  
  return response.json() as Promise<RedditResponse>;
}