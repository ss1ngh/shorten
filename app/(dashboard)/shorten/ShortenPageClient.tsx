"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  Link2,
  Loader2,
  BarChart2,
} from "lucide-react";
import { shortenUrl } from "@/lib/api";
import { useRouter } from "next/navigation";

type LinkItem = {
  shortId: string;
  shortUrl: string;
  originalUrl: string;
};

export default function ShortenPageClient() {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recentLinks, setRecentLinks] = useState<LinkItem[]>([]);

  /* 🔥 Load recent links from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("recent_links");
    if (stored) {
      setRecentLinks(JSON.parse(stored));
    }
  }, []);

  /* 🔥 Save new link */
  const saveRecent = (link: LinkItem) => {
    const updated = [link, ...recentLinks].slice(0, 5);
    setRecentLinks(updated);
    localStorage.setItem("recent_links", JSON.stringify(updated));
  };

  const handleShorten = async () => {
    if (!url.trim()) return;

    setLoading(true);
    try {
      const data = await shortenUrl(url);

      const newLink = {
        shortId: data.url.shortId,
        shortUrl: data.url.shortUrl,
        originalUrl: url,
      };

      setShortLink(newLink.shortUrl);
      saveRecent(newLink);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortLink) return;
    await navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">

      {/* 🔥 CENTERED INPUT */}
      <div className="w-full max-w-xl text-center space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create short link
          </h1>
          <p className="text-gray-600">
            Turn long URLs into clean, trackable links instantly.
          </p>
        </div>

        {/* INPUT */}
        <div className="space-y-3">
          <div className="relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              placeholder="https://example.com"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 outline-none text-sm bg-white shadow-sm"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleShorten}
            disabled={loading || !url.trim()}
            className="w-full py-3 rounded-2xl bg-gray-900 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create link"
            )}
          </button>
        </div>

        {/* RESULT */}
        {shortLink && (
          <div className="flex items-center gap-2 mt-2">
            <input
              value={shortLink}
              readOnly
              className="flex-1 bg-white border rounded-xl px-3 py-2 text-sm"
            />

            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm"
            >
              {copied ? "Copied" : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* 🔥 RECENT LINKS */}
      {recentLinks.length > 0 && (
        <div className="w-full max-w-2xl">

          <h2 className="text-sm font-semibold text-gray-500 mb-4">
            Recent links
          </h2>

          <div className="space-y-2">
            {recentLinks.map((link) => (
              <div
                key={link.shortId}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {link.shortUrl}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {link.originalUrl}
                  </p>
                </div>

                <button
                  onClick={() =>
                    router.push(`/analytics?shortId=${link.shortId}`)
                  }
                  className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-black"
                >
                  <BarChart2 className="w-4 h-4" />
                  Analytics
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}