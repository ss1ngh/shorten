"use client";

import { usePathname } from "next/navigation";
import {
    Link2,
    Globe,
    BarChart2,
    Layers,
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen bg-white flex">

            {/* SIDEBAR */}
            <aside className="w-56 bg-white border-r border-gray-100 p-5 flex flex-col gap-6">
                <div className="font-bold text-gray-900 text-lg">
                    Sniplink
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={Link2} label="Links" href="/shorten" />
                    <SidebarItem icon={BarChart2} label="Analytics" href="/analytics" />
                    <SidebarItem icon={Globe} label="Domains" href="#" />
                    <SidebarItem icon={Layers} label="Tags" href="#" />
                </nav>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">

                {/* HEADER */}
                <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                        Dashboard
                    </span>
                    <div className="w-8 h-8 bg-white rounded-full" />
                </header>

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}

function SidebarItem({
    icon: Icon,
    label,
    href,
}: {
    icon: any;
    label: string;
    href: string;
}) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <a
            href={href}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition ${active
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-50"
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </a>
    );
}