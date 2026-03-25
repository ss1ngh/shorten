"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NumberTicker from "@/components/ui/NumberTicker";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  ChartLineUp, Globe, DeviceMobile, CursorClick,
  CalendarBlank, ArrowUp, ArrowDown,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/* ───── Mock Data ───── */
const clicksOverTime = [
  { day: "Mon", clicks: 240, unique: 180 }, { day: "Tue", clicks: 380, unique: 290 },
  { day: "Wed", clicks: 310, unique: 230 }, { day: "Thu", clicks: 520, unique: 410 },
  { day: "Fri", clicks: 480, unique: 350 }, { day: "Sat", clicks: 620, unique: 490 },
  { day: "Sun", clicks: 710, unique: 540 },
];

const monthlyClicks = [
  { m: "Jan", clicks: 4200 }, { m: "Feb", clicks: 5800 }, { m: "Mar", clicks: 4900 },
  { m: "Apr", clicks: 7200 }, { m: "May", clicks: 6100 }, { m: "Jun", clicks: 8400 },
  { m: "Jul", clicks: 7800 }, { m: "Aug", clicks: 9200 }, { m: "Sep", clicks: 8600 },
  { m: "Oct", clicks: 10500 }, { m: "Nov", clicks: 11200 }, { m: "Dec", clicks: 12847 },
];

const deviceData = [
  { name: "Desktop", value: 45, color: "#FFE234" },
  { name: "Mobile", value: 38, color: "#ffffff" },
  { name: "Tablet", value: 12, color: "#71717a" },
  { name: "Other", value: 5, color: "#27272a" },
];

const topLinks = [
  { slug: "/launch", clicks: 2847, change: 12.4 },
  { slug: "/docs", clicks: 1923, change: 8.2 },
  { slug: "/pricing", clicks: 1456, change: -3.1 },
  { slug: "/blog", clicks: 1102, change: 22.7 },
  { slug: "/signup", clicks: 891, change: 5.6 },
];

const countryData = [
  { country: "United States", clicks: 4230, pct: 33 },
  { country: "United Kingdom", clicks: 1840, pct: 14 },
  { country: "Germany", clicks: 1520, pct: 12 },
  { country: "India", clicks: 1380, pct: 11 },
  { country: "Canada", clicks: 980, pct: 8 },
  { country: "Others", clicks: 2897, pct: 22 },
];

const referrerData = [
  { name: "Direct", visits: 3200 }, { name: "Twitter", visits: 2400 },
  { name: "Google", visits: 1800 }, { name: "LinkedIn", visits: 1200 },
  { name: "GitHub", visits: 900 }, { name: "Reddit", visits: 600 },
];

/* ───── Sub-components ───── */
function StatCard({ icon: Icon, label, value, change, suffix }: {
  icon: PhosphorIcon; label: string; value: number; change: number; suffix?: string;
}) {
  const pos = change >= 0;
  return (
    <motion.div
      className="glass-dark flex flex-col rounded-2xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE234]/10 border border-[#FFE234]/20">
          <Icon size={20} weight="duotone" className="text-[#FFE234]" />
        </div>
        <span className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          pos ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {pos ? <ArrowUp size={11} weight="bold" /> : <ArrowDown size={11} weight="bold" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="mt-4">
        <NumberTicker value={value} suffix={suffix ?? ""} className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl" duration={2} />
      </div>
      <p className="mt-1 text-xs font-medium text-neutral-500">{label}</p>
    </motion.div>
  );
}

function ChartCard({ title, children, className = "" }: {
  title: string; children: React.ReactNode; className?: string;
}) {
  return (
    <motion.div
      className={`glass-dark flex flex-col rounded-2xl p-5 sm:p-6 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{title}</h3>
      {children}
    </motion.div>
  );
}

const tooltipStyle = {
  background: "#141414",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  fontSize: "12px",
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.5)",
  padding: "8px 12px",
  color: "#e4e4e7",
};

const axisProps = { fontSize: 11, fill: "#52525b" };

/* ───── Page ───── */
export default function AnalyticsPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <>
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-[#0a0a0a] py-32">
          <div className="h-7 w-7 animate-spin rounded-full border-[2.5px] border-[#FFE234] border-t-transparent" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#0a0a0a] pt-24">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-neutral-500">Real-time overview of your link performance</p>
            </div>
            <div className="glass-dark inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-medium text-neutral-400 sm:self-auto sm:text-sm">
              <CalendarBlank size={14} weight="bold" />
              Last 7 days
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 grid-cols-2 lg:grid-cols-4 sm:mb-8">
            <StatCard icon={CursorClick} label="Total Clicks" value={12847} change={18.2} />
            <StatCard icon={ChartLineUp} label="Unique Visitors" value={8420} change={12.5} />
            <StatCard icon={Globe} label="Countries" value={47} change={8.3} />
            <StatCard icon={DeviceMobile} label="Mobile Clicks" value={4882} change={-2.1} />
          </div>

          {/* Row 1 */}
          <div className="mb-6 grid gap-4 sm:mb-8 lg:grid-cols-3">
            <ChartCard title="Clicks Over Time" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={clicksOverTime}>
                  <defs>
                    <linearGradient id="aFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFE234" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#FFE234" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="day" tick={axisProps} axisLine={false} tickLine={false} />
                  <YAxis tick={axisProps} axisLine={false} tickLine={false} width={40} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="clicks" stroke="#FFE234" strokeWidth={2.5} fill="url(#aFill)" dot={{ fill: "#FFE234", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5.5 }} />
                  <Area type="monotone" dataKey="unique" stroke="#71717a" strokeWidth={2} strokeDasharray="6 3" fill="transparent" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Devices">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="45%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                    {deviceData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Legend verticalAlign="bottom" iconType="circle" iconSize={7} formatter={(v: string) => <span style={{ color: "#a1a1aa", fontSize: "11px" }}>{v}</span>} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Row 2 */}
          <div className="mb-6 grid gap-4 sm:mb-8 lg:grid-cols-2">
            <ChartCard title="Monthly Clicks">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyClicks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="m" tick={axisProps} axisLine={false} tickLine={false} />
                  <YAxis tick={axisProps} axisLine={false} tickLine={false} width={40} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="clicks" fill="#FFE234" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top Referrers">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={referrerData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" horizontal={false} />
                  <XAxis type="number" tick={axisProps} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#71717a" }} axisLine={false} tickLine={false} width={65} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="visits" fill="#FFE234" radius={[0, 5, 5, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Row 3 */}
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Top Performing Links">
              <div className="space-y-2.5">
                {topLinks.map((link, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-white/[0.06] p-3.5 transition-colors hover:bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE234]/10 text-[11px] font-bold tabular-nums text-[#FFE234]">{i + 1}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">sh0rten.com{link.slug}</p>
                        <p className="text-[11px] tabular-nums text-neutral-500">{link.clicks.toLocaleString()} clicks</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums ${link.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {link.change >= 0 ? <ArrowUp size={11} weight="bold" /> : <ArrowDown size={11} weight="bold" />}
                      {Math.abs(link.change)}%
                    </span>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard title="Top Countries">
              <div className="space-y-3.5">
                {countryData.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <span className="w-28 shrink-0 truncate text-sm font-medium text-neutral-300 sm:w-32">{c.country}</span>
                    <div className="flex-1">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-[#FFE234]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: i * 0.08 }}
                        />
                      </div>
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs tabular-nums text-neutral-500">
                      {c.clicks.toLocaleString()} ({c.pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
