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
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Accept": "application/json",
      "Referer": "https://www.reddit.com/",
      "Connection": "keep-alive",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    },
    // Ensure the data is fresh
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    console.error(`Reddit API error: ${response.status} ${response.statusText}`);
    const errorText = await response.text().catch(() => '');
    console.error(`Response body: ${errorText.substring(0, 500)}${errorText.length > 500 ? '...' : ''}`);
    throw new Error(`Failed to fetch from Reddit: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<RedditResponse>;
}
