// Types for Twitter/X API responses
// This is a placeholder and will be implemented later

export interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  // Add more fields as needed
}

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
  // Add more fields as needed
}

export interface TwitterResponse {
  tweet: TwitterTweet;
  user: TwitterUser;
  replies?: TwitterTweet[];
  // Add more fields as needed
}