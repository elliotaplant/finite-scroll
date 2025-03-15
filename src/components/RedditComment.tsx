import { RedditCommentData } from "@/types/reddit";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface RedditCommentProps {
  comment: RedditCommentData;
  depth?: number;
}

export default function RedditComment({ comment, depth = 0 }: RedditCommentProps) {
  if (!comment || comment.author === "[deleted]") {
    return null;
  }
  
  const commentDate = new Date(comment.created_utc * 1000).toLocaleString();
  const hasReplies = comment.replies?.data?.children && comment.replies.data.children.length > 0;
  const replyCount = hasReplies ? comment.replies?.data?.children?.length : 0;
  
  // All comments use the same box style, but we adjust the margin based on depth
  const marginClass = depth === 0 ? "mb-6" : "mb-3";
  
  // Use smaller border radius for nested comments to indicate hierarchy
  const borderRadiusClass = depth > 2 ? "rounded" : "rounded-lg";
  
  return (
    <div className={marginClass}>
      <div 
        className={`${borderRadiusClass} p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="mb-2">
          <span className="font-medium">u/{comment.author}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{commentDate}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">↑ {comment.score}</span>
        </div>
        
        <div>
          <MarkdownRenderer>{comment.body}</MarkdownRenderer>
        </div>
        
        {/* Show reply button/indicator if there are replies */}
        {hasReplies && (
          <details className="mt-4">
            <summary className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs font-medium text-blue-500 dark:text-blue-400">
              {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
            </summary>
            
            <div className="mt-4">
              {comment.replies?.data?.children?.map((reply) => (
                <RedditComment 
                  key={reply.data.id} 
                  comment={reply.data}
                  depth={depth + 1} 
                />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
