// Types for Twitter/X API responses

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

export interface TwitterMedia {
  type: string;
  url: string;
  width?: number;
  height?: number;
  alt_text?: string;
}

export interface TwitterResponse {
  tweet: TwitterTweet;
  user: TwitterUser;
  replies?: TwitterTweet[];
  media?: TwitterMedia[];
}