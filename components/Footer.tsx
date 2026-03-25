"use client";

import { Link2 } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold">
          <Link2 className="w-5 h-5" />
          Sniplink
        </Link>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Sniplink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
