"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';
import type { WellbeingRecommendationsInput } from "@/ai/flows/generate-wellbeing-recommendations";

type Category = {
    offsety: any;
    offsetx: any;
    key: keyof WellbeingRecommendationsInput;
    label: string;
    icon: React.ElementType;
    group: 'work' | 'health' | 'relationships';
};

interface WheelOfLifeChartProps {
    scores: WellbeingRecommendationsInput;
    categories: readonly Category[];
}

export default function WheelOfLifeChart({ scores, categories }: WheelOfLifeChartProps) {
    const chartData = categories.map(category => ({
        subject: category.label,
        value: scores[category.key],
        fullMark: 12,
    }));

    const primaryColor = "hsl(var(--chart-1))";
    const mutedColor = "hsl(var(--muted-foreground))";
    const borderColor = "hsl(var(--border))";

    const groupColors = {
        work: 'hsl(var(--chart-1))',
        health: 'hsl(var(--chart-2))',
        relationships: 'hsl(var(--chart-3))',
    };
    
    const renderIconTick = (props: any) => {
        const { x, y, payload } = props;
        const category = categories.find(c => c.label === payload.value);

        if (!category) {
            return null;
        }

        const Icon = category.icon;
        const color = groupColors[category.group];
        return (
            <g transform={`translate(${x + category.offsetx * 10},${y + category.offsety * 10})`}>
                <g transform="translate(-10, -10)">
                    <Icon color={color} width={20} height={20} />
                </g>
            </g>
        );
    };

    const CustomizedDot = ({ cx, cy, payload }: any) => {
        const category = categories.find(c => c.label === payload.subject);
        if (!category) return null;

        const color = groupColors[category.group];
        return <circle cx={cx} cy={cy} r={5} stroke={color} strokeWidth={2} fill="hsl(var(--card))" />;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData}>
                <PolarGrid stroke={borderColor} />
                <PolarAngleAxis dataKey="subject" tick={renderIconTick} tickMargin={15}/>
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Radar
                    name="Life Compass"
                    dataKey="value"
                    stroke={primaryColor}
                    fill={primaryColor}
                    fillOpacity={0.6}
                    animationDuration={300}
                    dot={<CustomizedDot />}
                    activeDot={{ r: 7 }}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}
