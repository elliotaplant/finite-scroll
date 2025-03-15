"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getServiceType } from "@/lib/utils";

export default function URLForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate URL
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    try {
      const serviceType = getServiceType(url);

      if (!serviceType) {
        setError("URL must be from Reddit or Twitter/X");
        return;
      }

      // Navigate to the appropriate page with the URL as a query parameter
      router.push(`/${serviceType}?url=${encodeURIComponent(url)}`);
    } catch {
      setError("Please enter a valid URL");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col space-y-4">
        <label htmlFor="url" className="text-xl font-medium">
          Paste a Reddit or Twitter/X link
        </label>
        <div className="flex space-x-2">
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://reddit.com/r/... or https://x.com/user/status/..."
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            View
          </button>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </form>
  );
}
