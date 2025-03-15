"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  children: string;
}

export default function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        // Style links
        a: ({ ...props }) => (
          <a
            {...props}
            className="text-blue-500 dark:text-blue-400 hover:underline break-words"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        // Style paragraphs
        p: ({ ...props }) => <p {...props} className="mb-4" />,
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
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
