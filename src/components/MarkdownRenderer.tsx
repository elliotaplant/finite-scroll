"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  children: string;
}

export default function MarkdownRenderer({ children }: MarkdownRendererProps) {
  // Function to check if a link is a video
  const isVideoLink = (url: string): boolean => {
    return /\.(mp4|webm|mov|ogg)$/i.test(url);
  };
  
  // Function to check if a link is a YouTube video
  const isYoutubeLink = (url: string): boolean => {
    return url.includes('youtube.com/watch') || url.includes('youtu.be/');
  };

  // Function to get YouTube embed URL
  const getYoutubeEmbedUrl = (url: string): string => {
    let videoId;
    
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v');
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  return (
    <ReactMarkdown
      components={{
        // Style links and handle video/media links
        a: ({ href, children, ...props }) => {
          if (href && isVideoLink(href)) {
            // Return as a sibling element instead of nested in a paragraph
            return (
              <span className="my-4 flex justify-center block">
                <video 
                  src={href} 
                  controls 
                  preload="metadata"
                  className="max-w-full h-auto rounded-md" 
                  playsInline
                >
                  {children}
                </video>
              </span>
            );
          } else if (href && isYoutubeLink(href)) {
            // Return as a sibling element instead of nested in a paragraph
            return (
              <span className="my-4 flex justify-center block">
                <iframe
                  src={getYoutubeEmbedUrl(href)}
                  title="YouTube video"
                  allowFullScreen
                  className="w-full aspect-video rounded-md"
                  loading="lazy"
                ></iframe>
              </span>
            );
          } else {
            return (
              <a
                href={href}
                {...props}
                className="text-blue-500 dark:text-blue-400 hover:underline break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          }
        },
        // Style paragraphs
        p: ({ children, ...props }) => <p {...props} className="mb-4">{children}</p>,
        // Style headings
        h1: ({ ...props }) => (
          <h1 {...props} className="text-2xl font-bold mb-4 mt-6" />
        ),
        h2: ({ ...props }) => (
          <h2 {...props} className="text-xl font-bold mb-3 mt-5" />
        ),
        h3: ({ ...props }) => (
          <h3 {...props} className="text-lg font-bold mb-2 mt-4" />
        ),
        // Style lists
        ul: ({ ...props }) => (
          <ul {...props} className="list-disc pl-6 mb-4" />
        ),
        ol: ({ ...props }) => (
          <ol {...props} className="list-decimal pl-6 mb-4" />
        ),
        li: ({ ...props }) => <li {...props} className="mb-1" />,
        // Style code blocks
        code: ({ ...props }) => (
          <code
            {...props}
            className="block bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm overflow-x-auto mb-4"
          />
        ),
        // Style blockquotes
        blockquote: ({ ...props }) => (
          <blockquote
            {...props}
            className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-4"
          />
        ),
        // Style horizontal rules
        hr: ({ ...props }) => (
          <hr
            {...props}
            className="my-6 border-t border-gray-300 dark:border-gray-600"
          />
        ),
        // Style tables
        table: ({ ...props }) => (
          <div className="overflow-x-auto mb-4">
            <table
              {...props}
              className="min-w-full divide-y divide-gray-300 dark:divide-gray-600"
            />
          </div>
        ),
        thead: ({ ...props }) => (
          <thead {...props} className="bg-gray-100 dark:bg-gray-800" />
        ),
        th: ({ ...props }) => (
          <th
            {...props}
            className="px-3 py-2 text-left text-sm font-semibold"
          />
        ),
        td: ({ ...props }) => (
          <td {...props} className="px-3 py-2 whitespace-nowrap text-sm" />
        ),
        // Style images
        img: ({ ...props }) => (
          <span className="flex justify-center my-4 block">
            <img
              {...props}
              alt={props.alt || ''}
              className="max-w-full h-auto rounded-md"
              loading="lazy"
            />
          </span>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
