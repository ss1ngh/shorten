"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full bg-white z-50 relative">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-bold text-2xl tracking-tighter text-gray-900">
          Sniplink
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
          Product <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
          Solutions <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
          Resources <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <Link href="#enterprise" className="hover:text-gray-900 transition-colors">Enterprise</Link>
        <Link href="#customers" className="hover:text-gray-900 transition-colors">Customers</Link>
        <Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
          Log in
        </Link>
        <Link href="/signup" className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;