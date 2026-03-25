"use client";

import { Link2, Globe, BarChart2, Users, Layers, Tag, Copy, HelpCircle, FileText, QrCode, Image as ImageIcon, ChevronRight, Bell, Settings } from "lucide-react";

const DashboardMockup = () => {
  return (
    <div className="w-full bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col h-[550px] outline-none ring-0 focus:outline-none focus:ring-0 border-none select-none">

      {/* Top Chrome / Header */}
      <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="font-bold tracking-tighter text-gray-900 flex items-center gap-1 border-r border-gray-200 pr-4">
            <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            Sniplink
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100/80 px-3 py-1 rounded-full">
            <Layers className="w-4 h-4" /> Links <ChevronRight className="w-3 h-3 text-gray-400" />
            <div className="w-4 h-4 bg-gray-900 rounded-full text-white flex items-center justify-center text-[8px]">A</div>
            go.acme.launch
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors outline-none focus:ring-0">
            <Copy className="w-3 h-3" /> Copy link
          </button>
          <Bell className="w-4 h-4 text-gray-400" />
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden bg-gray-50/30">
        {/* Sidebar */}
        <div className="w-52 border-r border-gray-100 p-4 hidden md:flex flex-col gap-6 bg-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 text-sm font-medium text-gray-900">
              <Link2 className="w-4 h-4" /> Links
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500">
              <Globe className="w-4 h-4" /> Domains
            </div>
          </div>
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Insights</p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500">
              <BarChart2 className="w-4 h-4" /> Analytics
            </div>
          </div>
        </div>

        {/* Center Form Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">Destination URL</label>
              <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white shadow-sm">
                https://acme.com/launch
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 block">Domain</label>
                <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white shadow-sm flex items-center justify-between">
                  <span>go.acme.com</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 block">Short Link</label>
                <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white shadow-sm">launch</div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-gray-100">
              <span className="text-sm font-semibold text-gray-700">Conversion Tracking</span>
              <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Sidebar */}
        <div className="w-72 border-l border-gray-100 bg-gray-50/50 p-6 hidden lg:flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">QR Code</label>
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-900" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Custom Link Preview</label>
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-gray-100 h-28 flex items-center justify-center text-gray-300">
                <ImageIcon className="w-10 h-10" />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-gray-900 truncate">Acme Tasks Launch</p>
                <p className="text-[10px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">Modern link tracking for teams.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default DashboardMockup;