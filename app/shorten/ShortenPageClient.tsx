"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, QrCode, Link2, Loader2, ArrowRight } from "lucide-react";
import { shortenUrl } from "@/lib/api";

export default function ShortenPageClient() {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError("");
    try {
      const data = await shortenUrl(url);
      setShortLink(data.url.shortUrl);
      setQrCode(data.qrCode);
    } catch (err) {
      setError("Failed to shorten URL. Please check the URL and try again.");
      console.error("Failed to shorten URL:", err);
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

  const handleDownloadQr = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white pt-12">
      <div className="absolute top-20 left-0 -translate-x-1/2 z-0 pointer-events-none opacity-50 hidden md:block">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="299" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="200" stroke="#e5e7eb" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="100" stroke="#e5e7eb" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-40 right-0 translate-x-1/2 z-0 pointer-events-none opacity-50 hidden md:block">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="299" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="200" stroke="#e5e7eb" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="100" stroke="#e5e7eb" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-24 -left-8 hidden lg:flex z-20 transform -rotate-6">
        <div className="bg-white/40 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] border border-white/60">
          <div className="relative w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-[1.25rem] shadow-[0_4px_12px_rgba(37,99,235,0.2)] flex items-center justify-center">
            <Image src="/assets/link-filled.svg" alt="Link" width={30} height={30} className="brightness-0 invert" />
          </div>
        </div>
      </div>

      <div className="absolute top-36 -right-8 hidden lg:flex z-20 transform rotate-6">
        <div className="bg-white/40 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] border border-white/60">
          <div className="relative w-16 h-16 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-[1.25rem] shadow-[0_4px_12px_rgba(16,185,129,0.2)] flex items-center justify-center">
            <Image src="/assets/graphs.svg" alt="Graph" width={32} height={32} className="brightness-0 invert" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="text-sm font-medium text-gray-700">Shorten instantly</span>
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Shorten your links
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-lg mx-auto">
            Paste your long URL below to get a shorter, trackable link in seconds.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                className="w-full pl-14 pr-5 py-4.5 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400 text-lg"
              />
            </div>
            
            <button
              onClick={handleShorten}
              disabled={loading || !url.trim()}
              className="w-full bg-gray-900 text-white py-4.5 rounded-2xl font-bold text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gray-200 hover:shadow-xl"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Shorten"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {shortLink && (
            <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-3">Your shortened link</p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={shortLink}
                  className="flex-1 bg-white px-5 py-3.5 rounded-xl border border-gray-200 text-gray-900 font-semibold text-base"
                />
                <button
                  onClick={handleCopy}
                  className="p-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-md"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <span className="text-sm font-bold">Copied!</span>
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={handleDownloadQr}
                  className="p-3.5 bg-white border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors shadow-md"
                  title="Download QR Code"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}