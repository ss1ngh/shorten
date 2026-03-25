"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const data = [
    { name: "Jan", current: 30, previous: 20 },
    { name: "Feb", current: 45, previous: 35 },
    { name: "Mar", current: 40, previous: 50 },
    { name: "Apr", current: 55, previous: 40 },
    { name: "May", current: 82, previous: 22 },
    { name: "Jun", current: 60, previous: 45 },
    { name: "Jul", current: 50, previous: 55 },
];

export const StatisticsChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            {/* margin left adjusted to 0 to keep text inside the card padding */}
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />

                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }}
                    dy={15} // Pushes labels down slightly
                />
                <YAxis
                    width={30} // Reserved space for labels inside the chart
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }}
                />

                <Tooltip
                    contentStyle={{
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        padding: '12px'
                    }}
                    labelStyle={{ color: '#6b7280', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}
                    itemStyle={{ color: '#030712', fontSize: '12px', fontWeight: 800 }}
                />

                <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#e5e7eb"
                    strokeWidth={3}
                    dot={false}
                    strokeDasharray="6 6"
                />

                <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#030712"
                    strokeWidth={4}
                    dot={{ r: 4, fill: '#030712', strokeWidth: 3, stroke: '#ffffff' }}
                    activeDot={{ r: 6, fill: '#030712', stroke: '#ffffff', strokeWidth: 3 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};