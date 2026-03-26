"use client";

import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        sub: "/month",
        description: "Perfect for individuals",
        features: [
            "50 links / month",
            "Basic analytics",
            "QR code generation",
        ],
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
        <section className="w-full py-20 pb-30 bg-[#f3f3f3]">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-[45px] font-bold text-black mb-2">
                        Pricing plans
                    </h2>
                    <p className="text-gray-500 text-[20px]">
                        Choose the right plan for your needs.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className="group rounded-[28px] transition-all duration-300 hover:scale-[1.03]"
                        >
                            <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)]  transition-all duration-300 h-full flex flex-col justify-between">

                                {/* TOP */}
                                <div>
                                    {/* Pricing Box */}
                                    <div
                                        className={`rounded-[20px] px-5 py-5 mb-5 ${i === 1
                                            ? "bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-50"
                                            : "bg-[#f3f3f3]"
                                            }`}
                                    >
                                        {/* Tag */}
                                        <div className="inline-block text-[11px] font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-full mb-4">
                                            {plan.name.toUpperCase()}
                                        </div>

                                        {/* Price */}
                                        <div className="text-[32px] font-semibold text-black">
                                            {plan.price}
                                            {plan.sub && (
                                                <span className="text-[14px] text-gray-600 ml-1 font-medium">
                                                    {plan.sub}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[13px] text-gray-600 mb-6">
                                        {plan.description}
                                    </p>

                                    {/* Button */}
                                    <button className="w-full py-3 rounded-full text-white text-[14px] font-medium bg-gradient-to-b from-black to-gray-800 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-90 transition">
                                        {plan.button}
                                    </button>
                                </div>

                                {/* FEATURES */}
                                <div className="mt-8 space-y-4">
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