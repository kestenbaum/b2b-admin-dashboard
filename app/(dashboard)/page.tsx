import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

const METRICS_DATA = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1% from last month",
        icon: DollarSign,
    },
    {
        title: "Subscriptions",
        value: "+2350",
        change: "+180.1% from last month",
        icon: Users,
    },
    {
        title: "Sales",
        value: "+12,234",
        change: "+19% from last month",
        icon: CreditCard,
    },
    {
        title: "Active Now",
        value: "+573",
        change: "+201 since last hour",
        icon: Activity,
    },
];

export default function DashboardOverview() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your store&apos;s performance.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {METRICS_DATA.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <Card key={metric.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {metric.change}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 h-[300px] flex items-center justify-center text-muted-foreground border-t border-dashed mt-4">
                        [ Chart Component Placeholder ]
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-t border-dashed mt-4">
                        [ Recent Sales List Placeholder ]
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}