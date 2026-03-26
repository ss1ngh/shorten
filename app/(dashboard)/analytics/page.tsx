"use client";

import { useState, useEffect } from "react";
import { BarChart2, QrCode, X } from "lucide-react";

/* 🔥 Types */
type LinkItem = {
  shortId: string;
  shortUrl: string;
  originalUrl: string;
};

/* 🔥 Mock analytics (replace with backend later) */
const mockAnalytics = {
  clicks: 1284,
  countries: ["US", "India", "UK"],
  devices: ["Mobile", "Desktop"],
};

export default function AnalyticsPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [selected, setSelected] = useState<LinkItem | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("recent_links");
    if (stored) setLinks(JSON.parse(stored));
  }, []);

  const downloadQR = (url: string) => {
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}`;
    const a = document.createElement("a");
    a.href = qr;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Analytics
      </h1>

      {/* 🔥 CARDS */}
      <div className="flex flex-col gap-3">

        {links.map((link) => (
          <div
            key={link.shortId}
            className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-start hover:bg-gray-50 transition"
          >
            {/* LEFT */}
            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {link.shortUrl}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {link.originalUrl}
              </p>

              {/* ACTIONS */}
              <div className="flex items-center gap-4 mt-2">

                <button
                  onClick={() => setSelected(link)}
                  className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-black"
                >
                  <BarChart2 className="w-4 h-4" />
                  View analytics
                </button>

                <button
                  onClick={() => downloadQR(link.shortUrl)}
                  className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-black"
                >
                  <QrCode className="w-4 h-4" />
                  QR Code
                </button>

              </div>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <p className="text-sm text-gray-500">
            No links yet. Create one from the shorten page.
          </p>
        )}

      </div>

      {/* 🔥 GLASS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          {/* modal */}
          <div className="relative w-full max-w-md p-[6px] rounded-[2rem] backdrop-blur-xl border border-white/40">

            {/* glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)]" />

            <div className="relative bg-white/70 backdrop-blur-xl rounded-[1.8rem] border border-white/50 p-6 space-y-4">

              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-900">
                  Link Analytics
                </h2>
                <button onClick={() => setSelected(null)}>
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* LINK */}
              <div>
                <p className="text-xs text-gray-500">Short link</p>
                <p className="text-sm font-medium text-gray-900">
                  {selected.shortUrl}
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3">

                <Stat label="Clicks" value={mockAnalytics.clicks} />
                <Stat label="Countries" value={mockAnalytics.countries.length} />
                <Stat label="Devices" value={mockAnalytics.devices.length} />
                <Stat label="Unique" value={892} />

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🔥 stat card */
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/80 border rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}