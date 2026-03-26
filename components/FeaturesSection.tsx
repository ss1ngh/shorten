"use client";

import {
    Plus,
    BarChart2,
    QrCode,
    ToolCase,
    TrendingUp,
    Link2,
    Layers,
    Globe,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import DottedMap from "dotted-map";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

const map = new DottedMap({ height: 55, grid: "diagonal" });
const points = map.getPoints();

const chartData = [
    { name: "May", clicks: 120 },
    { name: "Jun", clicks: 240 },
    { name: "Jul", clicks: 180 },
    { name: "Aug", clicks: 320 },
    { name: "Sep", clicks: 260 },
    { name: "Oct", clicks: 420 },
];

const FeaturesSection = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [count, setCount] = useState(0);

    // Counter
    useEffect(() => {
        const end = 400000;
        const duration = 1200;
        const startTime = performance.now();

        function animate(time: number) {
            const progress = Math.min((time - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) requestAnimationFrame(animate);
            else setCount(end);
        }

        requestAnimationFrame(animate);
    }, []);

    // QR animation (TS safe)
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const safeContainer = container;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 120;
        canvas.height = 120;

        let animationFrame = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        function startAnimation() {
            let progress = 0;
            const particles: any[] = [];

            for (let i = 0; i < 160; i++) {
                particles.push({
                    x: Math.random() * 120,
                    y: Math.random() * 120,
                    tx: 20 + Math.random() * 80,
                    ty: 20 + Math.random() * 80,
                    z: Math.random() * 80 + 20,
                });
            }

            function animate() {
                ctx.clearRect(0, 0, 120, 120);
                progress += 0.02;

                particles.forEach((p) => {
                    const ease = 0.06 + (1 - progress) * 0.05;

                    p.x += (p.tx - p.x) * ease;
                    p.y += (p.ty - p.y) * ease;
                    p.z *= 0.9;

                    const scale = 1 + p.z / 60;
                    const opacity =
                        progress < 0.8 ? progress : 1 - (progress - 0.8) * 5;

                    ctx.fillStyle = `rgba(37,99,235,${Math.max(0, opacity)})`;
                    ctx.fillRect(p.x, p.y, 3 * scale, 3 * scale);
                });

                if (progress < 1.2) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    safeContainer.classList.add("qr-reveal");

                    timeoutId = setTimeout(() => {
                        safeContainer.classList.remove("qr-reveal");
                        ctx.clearRect(0, 0, 120, 120);
                        startAnimation();
                    }, 3000);
                }
            }

            animate();
        }

        startAnimation();

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(timeoutId);
        };
    }, []);

    const features = [
        { label: "Custom Aliases", icon: Link2 },
        { label: "Advanced Analytics", icon: TrendingUp },
        { label: "Bulk Shortening", icon: Layers },
        { label: "Link Expiry", icon: Globe },
        { label: "Password Protection", icon: QrCode },
    ];

    const shadow =
        "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),0_10px_20px_-5px_rgba(0,0,0,0.04)]";

    return (
        <section className="bg-white w-full py-28 px-6 border-t border-gray-100">

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-20">
                <h2 className="text-[42px] md:text-[56px] font-black font-bold text-gray-950">
                    Everything you need <br /> to manage and grow.
                </h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[320px]">

                {/* MAP */}
                <div className={`md:col-span-8 bg-white border hover:border-gray-300 rounded-[2.5rem] ${shadow} p-10 relative overflow-hidden`}>
                    <div className="absolute inset-0 text-blue-500/60">
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                            {points.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r={0.20} fill="currentColor" />
                            ))}
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-5xl font-black">
                            {(count / 1000).toFixed(0)}k+
                        </h3>
                        <p className="text-gray-500">links tracked across regions</p>
                    </div>
                </div>

                {/* QR */}
                <div ref={containerRef} className={`group md:col-span-4 bg-white border hover:border-gray-300 rounded-[2.5rem] ${shadow} p-10 flex flex-col justify-between`}>
                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-950">QR Codes</h3>
                        <QrCode className="w-5 h-5 text-gray-400 group-hover:icon-pulse" />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative w-[120px] h-[120px]">
                            <canvas ref={canvasRef} className="absolute inset-0 qr-canvas" />
                            <QrCode
                                className="absolute inset-0 m-auto w-28 h-28 text-black/70 opacity-0 qr-final group-hover:qr-pulse"
                            />
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        Generate trackable QR codes instantly
                    </p>
                </div>

                {/* CHART */}
                <div className={`md:col-span-6 bg-white border hover:border-gray-300 rounded-[2.5rem] ${shadow} p-8`}>
                    <div className="flex justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-950">Click Performance</h3>
                            <p className="text-sm text-gray-500">Real-time analytics</p>
                        </div>
                        <BarChart2 className="w-5 h-5 text-blue-500" />
                    </div>

                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis hide dataKey="name" />
                            <YAxis hide />
                            <Area
                                type="monotone"
                                dataKey="clicks"
                                stroke="#2563eb"
                                fill="url(#fill)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* TOOLS */}
                <div className={`group md:col-span-6 bg-white border hover:border-gray-300 rounded-[2.5rem] ${shadow} p-10`}>
                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-gray-950 flex items-center gap-2">
                            <div className="p-2.5 rounded-xl group-hover:icon-pulse">
                                <ToolCase className="w-6 h-6 text-black" />
                            </div>
                            Powerful Tools
                        </h3>
                        <p className="text-gray-600 mt-3 text-sm max-w-sm">
                            Everything you need to create, manage, and optimize links at scale.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {features.map(({ label, icon: Icon }) => (
                            <div key={label} className="group flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-xl hover:border-gray-300 text-sm">
                                <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:icon-pulse" />
                                {label}
                            </div>
                        ))}
                        <div className="bg-neutral-950 text-white px-3 py-2 rounded-xl flex items-center gap-1 text-sm">
                            <Plus className="w-3.5 h-3.5" /> More
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;