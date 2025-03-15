"use client";

import { TwitterTweet, TwitterUser, TwitterMedia } from "@/types/twitter";
import { formatDistanceToNow } from "date-fns";
import MarkdownRenderer from "./MarkdownRenderer";

interface TwitterPostProps {
  tweet: TwitterTweet;
  user: TwitterUser;
  media?: TwitterMedia[];
}

export default function TwitterPost({
  tweet,
  user,
  media = [],
}: TwitterPostProps) {
  const formattedDate = formatDistanceToNow(new Date(tweet.created_at), {
    addSuffix: true,
  });

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-start mb-3">
        <img
          src={user.profile_image_url}
          alt={user.name}
          className="rounded-full mr-3 w-12 h-12"
        />
        <div className="flex-1 min-w-0">
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <MarkdownRenderer>{tweet.text}</MarkdownRenderer>
      </div>

      {media && media.length > 0 && (
        <div
          className={`mb-3 grid ${
            media.length > 1 ? "grid-cols-2 gap-2" : "grid-cols-1"
          }`}
        >
          {media.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              {item.type === "photo" || item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.alt_text || "Tweet image"}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              ) : item.type === "video" || item.type === "animated_gif" ? (
                <video
                  src={item.url}
                  controls
                  loop={item.type === "animated_gif"}
                  autoPlay={item.type === "animated_gif"}
                  muted={item.type === "animated_gif"}
                  playsInline
                  className="w-full h-auto"
                />
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div className="text-gray-500 dark:text-gray-400 text-sm">
        {formattedDate}
      </div>
    </div>
  );
}
