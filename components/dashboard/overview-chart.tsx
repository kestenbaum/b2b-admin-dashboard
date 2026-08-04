"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/app/(dashboard)/products/lib/api/products";

interface OverviewChartProps {
    products: Product[];
}

export function OverviewChart({ products }: OverviewChartProps) {
    const chartData = useMemo(() => {
        if (!products || products.length === 0) return [];

        const categoryCounts = products.reduce((acc, product) => {
            const category = product.category || "Uncategorized";
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCounts)
            .map(([category, count]) => ({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                total: count,
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 7);
    }, [products]);

    return (
        <Card className="col-span-4 h-full">
            <CardHeader>
                <CardTitle className="text-lg">Products by Category</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-87.5 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar
                                dataKey="total"
                                fill="currentColor"
                                radius={[4, 4, 0, 0]}
                                className="fill-primary"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}