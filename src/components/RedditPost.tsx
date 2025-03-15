import { RedditPostData } from "@/types/reddit";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface RedditPostProps {
  post: RedditPostData;
}

export default function RedditPost({ post }: RedditPostProps) {
  const postDate = new Date(post.created_utc * 1000).toLocaleString();
  
  return (
    <div className="border rounded-lg p-4 mb-6" style={{ 
      borderColor: 'var(--card-border)',
      backgroundColor: 'var(--card-background)',
      color: 'var(--foreground)'
    }}>
      <div className="mb-2">
        <span className="text-sm text-gray-500">
          {post.subreddit_name_prefixed} • Posted by u/{post.author} • {postDate}
        </span>
      </div>
      
      <h1 className="text-xl font-bold mb-2">{post.title}</h1>
      
      {post.selftext && (
        <div className="mb-4">
          <MarkdownRenderer>{post.selftext}</MarkdownRenderer>
        </div>
      )}
      
      <div className="flex items-center text-sm text-gray-500 mt-4">
        <span className="mr-4">
          ↑ {post.score} ({Math.round(post.upvote_ratio * 100)}% upvoted)
        </span>
        <span>
          {post.num_comments} comments
        </span>
      </div>
    </div>
  );
}