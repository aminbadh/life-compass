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
};

interface WheelOfLifeChartProps {
    scores: WellbeingRecommendationsInput;
    categories: readonly Category[];
}

export default function WheelOfLifeChart({ scores, categories }: WheelOfLifeChartProps) {
    const chartData = categories.map(category => ({
        subject: category.label,
        value: scores[category.key],
        fullMark: 10,
    }));

    const primaryColor = "hsl(210 60% 50%)";
    const mutedColor = "hsl(210 20% 40%)";
    const borderColor = "hsl(210 20% 85%)";
    
    const renderIconTick = (props: any) => {
        const { x, y, payload } = props;
        const category = categories.find(c => c.label === payload.value);

        if (!category) {
            return null;
        }

        const Icon = category.icon;
        console.log("x=",x,y)
        return (
            <g transform={`translate(${x + category.offsetx * 10},${y + category.offsety * 10})`}>
                <g transform="translate(-10, -10)">
                    <Icon color={mutedColor} width={20} height={20} />
                </g>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData}>
                <PolarGrid stroke={borderColor} />
                <PolarAngleAxis dataKey="subject" tick={renderIconTick} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Radar
                    name="Life Compass"
                    dataKey="value"
                    stroke={primaryColor}
                    fill={primaryColor}
                    fillOpacity={0.6}
                    animationDuration={300}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}
