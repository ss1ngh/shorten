"use client";

import Image from "next/image";
import { ArrowRight, BarChart2, QrCode } from "lucide-react";
import DashboardMockup from "@/components/DashboardMockup";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-12">
      {/* --- Background Spirals --- */}
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

        {/* --- Floating Widgets - No Focus Rings --- */}
        <div className="absolute top-20 -left-6 hidden lg:flex z-20 transform -rotate-6 outline-none focus:outline-none ring-0">
          <div className="bg-white/40 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] border border-white/60 pointer-events-none">
            <div className="relative w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-[1.25rem] shadow-[0_4px_12px_rgba(37,99,235,0.2)] flex items-center justify-center">
              <Image src="/assets/link-filled.svg" alt="Link" width={30} height={30} className="brightness-0 invert" />
            </div>
          </div>
        </div>

        <div className="absolute top-32 -right-6 hidden lg:flex z-20 transform rotate-6 outline-none focus:outline-none ring-0">
          <div className="bg-white/40 backdrop-blur-2xl p-5 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] border border-white/60 pointer-events-none">
            <div className="relative w-16 h-16 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-[1.25rem] shadow-[0_4px_12px_rgba(16,185,129,0.2)] flex items-center justify-center">
              <Image src="/assets/graphs.svg" alt="Graph" width={32} height={32} className="brightness-0 invert" />
            </div>
          </div>
        </div>

        {/* --- Hero Content --- */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm relative z-30 outline-none focus:ring-0">
          <span className="text-sm font-medium text-gray-700">Introducing Sniplink</span>
          <span className="text-xs font-semibold text-gray-500 border-l border-gray-300 pl-2 flex items-center gap-1">
            Read more <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <h1 className="relative z-30 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Turn clicks into revenue
        </h1>
        <p className="relative z-30 text-lg md:text-xl text-gray-600 max-w-2xl mb-10 font-medium">
          Sniplink is the modern link attribution platform for short links, conversion tracking, and affiliate programs.
        </p>

        <div className="relative z-30 mb-20">
          <button className="bg-gray-900 text-white px-10 py-4 rounded-full text-base font-bold transition-transform active:scale-95 shadow-xl shadow-gray-200 outline-none focus:outline-none focus:ring-0">
            Get Started
          </button>
        </div>
      </div>

      {/* --- Grey Section --- */}
      {/* Changed pt-12 to pt-8 to tighten the space above the mockup */}
      <div className="relative w-full bg-[#f8f9fa] pt-8 pb-24 border-t border-gray-100">

        {/* Added -mt-px to perfectly align with the top border and minimized gap */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-14 bg-white rounded-b-[2.5rem] px-12 flex items-center justify-center z-10 border-b border-x border-gray-100 hidden md:flex outline-none focus:ring-0">
          <svg className="absolute -left-6 top-[-1px] w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0H24V24C24 10.75 13.25 0 0 0Z" />
          </svg>
          <svg className="absolute -right-6 top-[-1px] w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 0H0V24C0 10.75 10.75 0 24 0Z" />
          </svg>

          <div className="flex items-center gap-8 text-sm font-bold text-gray-500">
            <span className="flex items-center gap-2 text-gray-900"><span className="text-orange-500">▲</span> Short Links</span>
            <span className="flex items-center gap-2"><BarChart2 className="w-4 h-4 text-emerald-500" /> Analytics</span>
            <span className="flex items-center gap-2"><QrCode className="w-4 h-4 text-purple-500" /> QR Codes</span>
          </div>
        </div>

        {/* Changed mt-4 to mt-10 to account for the notch space while keeping it tight */}
        <div className="max-w-5xl mx-auto px-6 relative z-20 outline-none focus:ring-0 mt-10">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;