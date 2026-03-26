"use client";

import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        sub: "/month",
        description: "Perfect for individuals",
        features: ["50 links / month", "Basic analytics", "QR code generation"],
        button: "Start Sharing",
    },
    {
        name: "Professional",
        price: "$12",
        sub: "/month",
        description: "Perfect for growing teams",
        features: [
            "Unlimited links",
            "Advanced analytics",
            "Custom domains",
            "Link performance insights",
        ],
        button: "Start Sharing",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        sub: "",
        description: "For large organizations",
        features: [
            "Unlimited links",
            "Team collaboration",
            "Custom integrations",
            "Priority support",
        ],
        button: "Contact Us",
    },
];

export default function PricingSection() {
    return (
        <section className="w-full py-24 bg-white">

            {/* 🔥 Clean centered container */}
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-[40px] font-bold text-black mb-2">
                        Pricing plans
                    </h2>
                    <p className="text-gray-500 text-[18px]">
                        Choose the right plan for your needs.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className="relative rounded-[28px] transition-all duration-300 hover:-translate-y-1"
                        >

                            {/* MOST POPULAR TAG */}
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                                    <div className="bg-black text-white text-[11px] font-semibold px-4 py-1.5 rounded-full shadow-sm">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* CARD */}
                            <div className="bg-white rounded-[24px] p-8 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-h-[520px] flex flex-col justify-between">

                                {/* TOP */}
                                <div>
                                    <div
                                        className={`rounded-[20px] px-5 py-5 mb-5 ${i === 1
                                                ? "bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-50"
                                                : "bg-[#f3f4f6]"
                                            }`}
                                    >
                                        <div className="inline-block text-[11px] font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-full mb-4">
                                            {plan.name.toUpperCase()}
                                        </div>

                                        <div className="text-[32px] font-semibold text-black">
                                            {plan.price}
                                            {plan.sub && (
                                                <span className="text-[14px] text-gray-600 ml-1 font-medium">
                                                    {plan.sub}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-gray-600 mb-6">
                                        {plan.description}
                                    </p>

                                    <button className="w-full py-3 rounded-full text-white text-[14px] font-medium bg-gradient-to-b from-black to-gray-800 shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:opacity-90 transition">
                                        {plan.button}
                                    </button>
                                </div>

                                {/* FEATURES */}
                                <div className="mt-10 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 text-[13px] text-gray-600"
                                        >
                                            <Check className="w-4 h-4 text-gray-400" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}