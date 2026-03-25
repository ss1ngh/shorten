"use client";

import { Plus, BarChart2, QrCode, Globe, Zap, TrendingUp } from "lucide-react";
import { SpendChart } from "@/components/ui/SpendChart";
import { StatisticsChart } from "@/components/ui/StatisticsChart";

const FeaturesSection = () => {
    const features = [
        "Custom Aliases",
        "UTM Builder",
        "Advanced Analytics",
        "Bulk Shortening",
        "API Access",
        "Link Expiry",
        "Password Protection"
    ];

    // Stacked shadow to maintain the 'thick' Apple-style effect without hover interaction
    const thickShadowClass = "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_10px_20px_-5px_rgba(0,0,0,0.06)]";

    return (
        <section className="bg-white w-full py-28 px-6 border-t border-gray-100 font-sans overflow-hidden">

            {/* Section Header */}
            <div className="max-w-6xl mx-auto mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-30">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tighter">
                        Everything you need <br /> to manage and grow.
                    </h2>
                    <p className="text-gray-600 text-lg font-medium max-w-xl leading-relaxed">
                        Advanced link management tools hidden behind a simple, intuitive interface. Built for modern marketing teams.
                    </p>
                </div>
                <button className="bg-gray-950 text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg">
                    View all features
                </button>
            </div>

            {/* Bento Grid - All Hover Effects Removed */}
            <div className="max-w-6xl w-full mx-auto relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[340px] gap-8">

                    {/* Block 1: Tools (Span 8 Cols) */}
                    <div className={`md:col-span-8 col-span-1 bg-white border border-gray-100 rounded-[2.5rem] ${thickShadowClass} p-12 flex flex-col justify-center relative group`}>
                        <div className="flex justify-between items-start gap-6 mb-8">
                            <div>
                                <h3 className="text-3xl font-black text-gray-950 flex items-center gap-3 tracking-tighter">
                                    <div className="p-3 bg-gray-950 rounded-2xl">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    Powerful Tools
                                </h3>
                                <p className="text-gray-600 text-base mt-4 font-medium max-w-sm leading-relaxed">All the features you need to track, manage, and optimize every link, out of the box.</p>
                            </div>
                        </div>
                        <div className="relative flex flex-wrap gap-3.5">
                            {features.map((f) => (
                                <span key={f} className="bg-gray-50 border border-gray-100 text-gray-800 text-sm font-semibold py-3 px-5 rounded-2xl shadow-inner">
                                    {f}
                                </span>
                            ))}
                            <span className="bg-gray-950 text-white text-sm font-bold py-3 px-5 rounded-2xl shadow flex items-center gap-1.5">
                                <Plus className="w-4 h-4" /> More
                            </span>
                        </div>
                    </div>

                    {/* Block 2: Global Stats (Span 4 Cols) */}
                    <div className={`md:col-span-4 col-span-1 bg-white border border-gray-100 rounded-[2.5rem] ${thickShadowClass} p-12 flex flex-col justify-between relative`}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Scalability</h3>
                            <Globe className="w-7 h-7 text-gray-400" />
                        </div>
                        <div>
                            <h4 className="text-6xl font-black text-gray-950 mb-3 tracking-tighter">10M+</h4>
                            <p className="text-lg text-gray-700 font-semibold mb-2">Links managed daily</p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
                                <TrendingUp className="w-4 h-4" /> +12% Traffic MoM
                            </div>
                        </div>
                    </div>

                    {/* Block 3: Line Chart (Span 6 Cols) */}
                    <div className={`md:col-span-6 col-span-1 bg-white border border-gray-100 rounded-[2.5rem] ${thickShadowClass} p-12 flex flex-col relative`}>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-950 tracking-tight mb-1">Click Performance</h3>
                                <p className="text-sm text-gray-500 font-medium">Real-time engagement tracking.</p>
                            </div>
                            <div className="bg-gray-950 p-2.5 rounded-xl text-white flex items-center gap-1.5 text-xs font-bold">
                                <BarChart2 className="w-4 h-4" /> Analytics
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-[220px]">
                            <StatisticsChart />
                        </div>
                    </div>

                    {/* Block 4: Bar Chart (Span 3 Cols) */}
                    <div className={`md:col-span-3 col-span-1 bg-white border border-gray-100 rounded-[2.5rem] ${thickShadowClass} p-12 flex flex-col justify-between relative`}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Click Distribution</h3>
                        <div className="flex-1 w-full h-36">
                            <SpendChart />
                        </div>
                        <p className="text-sm text-gray-500 font-medium text-center mt-6">Optimized for mobile users.</p>
                    </div>

                    {/* Block 5: QR Codes (Span 3 Cols) */}
                    <div className={`md:col-span-3 col-span-1 bg-white border border-gray-100 rounded-[2.5rem] ${thickShadowClass} p-12 flex flex-col justify-between relative`}>
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-xl font-bold text-gray-950 tracking-tight">QR Creator</h3>
                            <QrCode className="w-7 h-7 text-gray-400" />
                        </div>
                        <div className="flex-1 flex items-center justify-center pt-6 pb-2">
                            <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl shadow-inner">
                                <QrCode className="w-16 h-16 text-gray-950" strokeWidth={1.5} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium text-center">Customizable & trackable.</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;