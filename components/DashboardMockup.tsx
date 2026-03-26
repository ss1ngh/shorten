"use client";

import {
  Link2,
  Globe,
  BarChart2,
  Layers,
  Tag,
  Copy,
  HelpCircle,
  FileText,
  QrCode,
  Image as ImageIcon,
  ChevronRight,
  Bell,
} from "lucide-react";

const DashboardMockup = () => {
  return (
    <div className="relative p-[8px] rounded-[2.75rem] backdrop-blur-3xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

      {/* 🔥 EVEN RADIAL GLOW */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),rgba(255,255,255,0.15)_40%,transparent_70%)]" />

      {/* 🔥 EDGE LIGHT */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] border border-white/30" />

      {/* INNER GLASS CONTAINER */}
      <div className="relative w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_8px_25px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-[550px] select-none">

        {/* INNER HIGHLIGHT */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/20"></div>

        {/* Header */}
        <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="font-bold tracking-tighter text-gray-900 flex items-center gap-1 border-r border-gray-200 pr-4">
              <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              Sniplink
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100/80 px-3 py-1 rounded-full">
              <Layers className="w-4 h-4" />
              Links
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <div className="w-4 h-4 bg-gray-900 rounded-full text-white flex items-center justify-center text-[8px]">
                A
              </div>
              go.acme.launch
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 bg-white px-3 py-1.5 rounded-lg">
              <Copy className="w-3 h-3" />
              Copy link
            </button>

            <div className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Live
            </div>

            <Bell className="w-4 h-4 text-gray-400" />
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-1 bg-gray-50/30">

          {/* Sidebar */}
          <div className="w-48 border-r border-gray-100 p-4 hidden md:flex flex-col gap-6 bg-white/80 backdrop-blur-md">
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 text-sm font-medium text-gray-900">
                <Link2 className="w-4 h-4" /> Links
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500">
                <Globe className="w-4 h-4" /> Domains
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500">
                <Tag className="w-4 h-4" /> Tags
              </div>
            </div>

            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase mb-2">
                Insights
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500">
                <BarChart2 className="w-4 h-4" /> Analytics
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="flex-1 p-6">
            <div className="max-w-xl space-y-4">

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">
                  Destination URL
                </label>
                <div className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white/80 backdrop-blur-sm flex justify-between">
                  <span className="truncate">https://acme.com/launch</span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Domain</label>
                  <div className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white/80 backdrop-blur-sm flex justify-between">
                    <span>go.acme.com</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Short Link</label>
                  <div className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white/80 backdrop-blur-sm">
                    launch
                  </div>
                </div>
              </div>

              <div className="flex justify-between py-3 border-y border-gray-100">
                <span className="text-sm font-semibold text-gray-700">
                  Conversion Tracking
                </span>
                <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="Clicks" value="2,481" />
                <Stat label="CTR" value="18.2%" />
                <Stat label="Conversions" value="312" />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700">Activity</p>
                <div className="text-xs text-gray-500 bg-white/80 border rounded px-3 py-2">
                  New click from Brooklyn, New York
                </div>
                <div className="text-xs text-gray-500 bg-white/80 border rounded px-3 py-2">
                  New click from Paris, France
                </div>
                <div className="text-xs text-gray-500 bg-white/80 border rounded px-3 py-2">
                  New click from Dubai, UAE
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-64 border-l border-gray-100 bg-gray-50/50 p-4 hidden lg:flex flex-col gap-4">

            <div className="bg-white/80 backdrop-blur-sm border rounded-2xl p-4 flex flex-col items-center">
              <QrCode className="w-20 h-20" />
              <div className="flex gap-2 mt-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="w-5 h-5 bg-gray-400 rounded"></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden">
              <div className="bg-gray-100 h-20 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-300" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold">Acme Launch</p>
                <p className="text-[10px] text-gray-500">
                  Track links with precision.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border rounded-xl p-3">
              <p className="text-[10px] text-gray-400">Today</p>
              <div className="flex justify-between text-sm">
                <span>Clicks</span>
                <span className="font-semibold">128</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/80 backdrop-blur-sm border rounded-xl p-2">
    <p className="text-[10px] text-gray-400">{label}</p>
    <p className="text-sm font-semibold">{value}</p>
  </div>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default DashboardMockup;