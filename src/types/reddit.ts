// Types for Reddit API responses
// Note: This is a simplified version focusing on the data we need

export interface RedditMedia {
  reddit_video?: {
    fallback_url: string;
    height: number;
    width: number;
    duration: number;
  };
  oembed?: {
    provider_url: string;
    url: string;
    html: string;
    title: string;
  };
  type?: string;
}

export interface RedditPostData {
  id: string;
  title: string;
  author: string;
  selftext: string;
  selftext_html: string | null;
  created_utc: number;
  score: number;
  upvote_ratio: number;
  num_comments: number;
  permalink: string;
  url: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  is_video: boolean;
  is_self: boolean;
  media?: RedditMedia;
  secure_media?: RedditMedia;
  post_hint?: string;
}

export interface RedditCommentData {
  id: string;
  author: string;
  body: string;
  body_html: string;
  created_utc: number;
  score: number;
  permalink: string;
  replies?: {
    data?: {
      children?: {
        data: RedditCommentData;
      }[];
    };
  };
}

export interface RedditPostResponse {
  kind: string;
  data: {
    children: {
      kind: string;
      data: RedditPostData;
    }[];
  };
}

export interface RedditCommentsResponse {
  kind: string;
  data: {
    children: {
      kind: string;
      data: RedditCommentData;
    }[];
  };
}

// The Reddit API returns an array with two elements:
// [0] is the post data, [1] is the comments
export type RedditResponse = [RedditPostResponse, RedditCommentsResponse];