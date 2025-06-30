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
        fullMark: 10,
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

        const index = categories.indexOf(category);

        const numItems = categories.length;
        const radius = 8; // Based on your desired maximum offset
        const startAngle = -Math.PI / 2; // Start at the top (-90 degrees or -π/2 radians)

        // Calculate the angle for the current item
        // We subtract Math.PI / 2 to start the first item at the "12 o'clock" position
        const angle = startAngle + (index / numItems) * (2 * Math.PI);

        const offsetx = parseFloat((radius * Math.cos(angle)).toFixed(2));
        const offsety = parseFloat((radius * Math.sin(angle)).toFixed(2));

        const Icon = category.icon;
        const color = groupColors[category.group];
        return (
            <g transform={`translate(${x + offsetx},${y + offsety})`}>
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

    const legendData = [
        { name: 'Work', color: groupColors.work },
        { name: 'Health', color: groupColors.health },
        { name: 'Relationships', color: groupColors.relationships }
    ];

    return (
        <div className="w-full h-full flex flex-col">
            <ResponsiveContainer width="100%" height="100%" className="flex-1">
                <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData} >
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
                        dot={<CustomizedDot />}
                        activeDot={{ r: 7 }}
                    />
                </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center items-center gap-6 mt-2 text-xs text-muted-foreground">
                {legendData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
