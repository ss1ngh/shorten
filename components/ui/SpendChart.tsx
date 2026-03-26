"use client";

import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const data = [
    { day: "Mon", val: 45 },
    { day: "Tue", val: 60 },
    { day: "Wed", val: 35 },
    { day: "Thu", val: 50 },
    { day: "Fri", val: 74 },
    { day: "Sat", val: 40 },
    { day: "Sun", val: 15 }
];

export const SpendChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>

                {/* Minimalist X Axis */}
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 500 }}
                    dy={10}
                />

                <Tooltip
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                    }}
                    labelStyle={{ display: 'none' }}
                    itemStyle={{ color: '#111827', fontSize: '12px', fontWeight: 700 }}
                />

                {/* Bar styling with grey background track */}
                <Bar
                    dataKey="val"
                    radius={[4, 4, 4, 4]}
                    background={{ fill: '#f9fafb', radius: 4 }}
                    barSize={32}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            // Highlight Friday in dark grey, others in soft border-like grey
                            fill={entry.day === 'Fri' ? '#111827' : '#e5e7eb'}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};