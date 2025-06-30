"use client";

import { Label } from "@/components/ui/label";
import * as SliderPrimitive from "@radix-ui/react-slider"
import type { WellbeingRecommendationsInput } from "@/ai/flows/generate-wellbeing-recommendations";

type Category = {
    key: keyof WellbeingRecommendationsInput;
    label: string;
    icon: React.ElementType;
    group: 'work' | 'health' | 'relationships';
};

interface ValueSlidersProps {
    categories: readonly Category[];
    scores: WellbeingRecommendationsInput;
    onSliderChange: (key: keyof WellbeingRecommendationsInput, value: number) => void;
}

export default function ValueSliders({ categories, scores, onSliderChange }: ValueSlidersProps) {
    const groupColors = {
        work: 'hsl(var(--chart-1))',
        health: 'hsl(var(--chart-2))',
        relationships: 'hsl(var(--chart-3))',
    };

    return (
        <div className="space-y-4">
            {categories.map(({ key, label, icon: Icon, group }) => {
                const color = groupColors[group];
                return (
                    <div key={key} className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor={key} className="flex items-center gap-2 text-md font-medium">
                                <Icon className="w-5 h-5" style={{ color }} />
                                {label}
                            </Label>
                            <span className="w-12 text-right text-lg font-semibold" style={{ color }}>{scores[key]}</span>
                        </div>
                        <SliderPrimitive.Root
                            id={key}
                            min={1}
                            max={10}
                            step={1}
                            value={[scores[key]]}
                            onValueChange={([value]) => onSliderChange(key, value)}
                            aria-label={label}
                            className="relative flex w-full touch-none select-none items-center"
                        >
                            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                                <SliderPrimitive.Range className="absolute h-full" style={{ backgroundColor: color }} />
                            </SliderPrimitive.Track>
                            <SliderPrimitive.Thumb 
                                className="block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" 
                                style={{ borderColor: color }}
                            />
                        </SliderPrimitive.Root>
                    </div>
                );
            })}
        </div>
    );
}
