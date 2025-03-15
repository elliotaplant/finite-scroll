import { RedditPostData } from "@/types/reddit";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface RedditPostProps {
  post: RedditPostData;
}

export default function RedditPost({ post }: RedditPostProps) {
  const postDate = new Date(post.created_utc * 1000).toLocaleString();

  // Determine content type
  const isImage =
    !post.is_self &&
    (/\.(jpg|jpeg|png|gif|webp)$/i.test(post.url) ||
      post.post_hint === "image");

  const isVideo =
    post.is_video ||
    post.post_hint === "hosted:video" ||
    post.post_hint === "rich:video" ||
    (post.url && /\.(mp4|webm|mov)$/i.test(post.url));

  const isYouTube =
    post.url &&
    (post.url.includes("youtube.com") || post.url.includes("youtu.be"));

  const isExternalLink = !post.is_self && !isImage && !isVideo && !isYouTube;

  // Get video URL if available
  const getVideoUrl = () => {
    if (post.media?.reddit_video?.fallback_url) {
      return post.media.reddit_video.fallback_url;
    }
    if (post.secure_media?.reddit_video?.fallback_url) {
      return post.secure_media.reddit_video.fallback_url;
    }
    if (post.url && /\.(mp4|webm|mov)$/i.test(post.url)) {
      return post.url;
    }
    return null;
  };

  const videoUrl = getVideoUrl();

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {post.subreddit_name_prefixed} • Posted by u/{post.author} •{" "}
          {postDate}
        </span>
      </div>

      <h1 className="text-xl font-bold mb-2">{post.title}</h1>

      {post.selftext && (
        <div className="mb-4">
          <MarkdownRenderer>{post.selftext}</MarkdownRenderer>
        </div>
      )}

      {isImage && (
        <div className="mb-4 flex justify-center">
          <img
            src={post.url}
            alt={post.title}
            className="max-w-full h-auto rounded-md"
            loading="lazy"
          />
        </div>
      )}

      {isVideo && videoUrl && (
        <div className="mb-4 flex justify-center">
          <video
            src={videoUrl}
            controls
            preload="metadata"
            className="max-w-full h-auto rounded-md"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isYouTube && (
        <div className="mb-4 flex justify-center">
          <iframe
            src={post.url.replace(
              /(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
              "youtube.com/embed/$2"
            )}
            title="YouTube video"
            allowFullScreen
            className="w-full aspect-video rounded-md"
            loading="lazy"
          ></iframe>
        </div>
      )}

      {isExternalLink && (
        <div className="mb-4">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg
              className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="text-blue-500 dark:text-blue-400 break-all">
              {post.url}
            </span>
          </a>
        </div>
      )}

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        <span className="mr-4">
          ↑ {post.score} ({Math.round(post.upvote_ratio * 100)}% upvoted)
        </span>
        <span>{post.num_comments} comments</span>
      </div>
    </div>
  );
}
