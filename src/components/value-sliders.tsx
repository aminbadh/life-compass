"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
        work: 'var(--chart-1)',
        health: 'var(--chart-2)',
        relationships: 'var(--chart-3)',
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
                        <Slider
                            id={key}
                            min={1}
                            max={10}
                            step={1}
                            value={[scores[key]]}
                            onValueChange={([value]) => onSliderChange(key, value)}
                            aria-label={label}
                        />
                    </div>
                );
            })}
        </div>
    );
}
