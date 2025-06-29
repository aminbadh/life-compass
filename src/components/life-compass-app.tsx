"use client";

import type { WellbeingRecommendationsInput } from "@/ai/flows/generate-wellbeing-recommendations";
import { getAIRecommendations } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Briefcase, DollarSign, Heart, HeartPulse, Home, Smile, Users } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import RecommendationsDisplay from "./recommendations-display";
import ValueSliders from "./value-sliders";
import WheelOfLifeChart from "./wheel-of-life-chart";

const categories = [
    { key: "career", label: "Career & Work", icon: Briefcase, offsetx: 0, offsety: -1.2, group: "work" },
    { key: "finances", label: "Finances & Money", icon: DollarSign, offsetx: 0.85, offsety: -0.85, group: "work" },
    { key: "health", label: "Health & Wellbeing", icon: HeartPulse, offsetx: 1.2, offsety: 0, group: "health" },
    { key: "family", label: "Family & Friends", icon: Users, offsetx: 0.85, offsety: 0.85, group: "relationships" },
    { key: "relationships", label: "Relationships & Love", icon: Heart, offsetx: 0, offsety: 1.2, group: "relationships"  },
    { key: "personalGrowth", label: "Personal Growth & Learning", icon: BrainCircuit, offsetx: -0.85, offsety: 0.85, group: "work" },
    { key: "fun", label: "Fun & Recreation", icon: Smile, offsetx: -1.2, offsety: 0, group: "health" },
    { key: "environment", label: "Physical Environment", icon: Home, offsetx: -0.85, offsety: -0.85, group: "work" },
] as const;

type CategoryKey = typeof categories[number]['key'];

const initialScores: WellbeingRecommendationsInput = {
    career: 5,
    finances: 5,
    health: 5,
    family: 5,
    relationships: 5,
    personalGrowth: 5,
    fun: 5,
    environment: 5,
};

export default function LifeCompassApp() {
    const [scores, setScores] = useState<WellbeingRecommendationsInput>(initialScores);
    const [recommendations, setRecommendations] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSliderChange = (key: CategoryKey, value: number) => {
        setScores(prev => ({ ...prev, [key]: value }));
    };

    const generalScore = useMemo(() => {
        const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
        return (total / categories.length).toFixed(1);
    }, [scores]);

    const handleGetRecommendations = () => {
        startTransition(async () => {
            const result = await getAIRecommendations(scores);
            if (result.startsWith("Sorry")) {
                 toast({
                    variant: "destructive",
                    title: "Error",
                    description: result,
                });
                setRecommendations(null);
            } else {
                setRecommendations(result);
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Your Wheel of Life</CardTitle>
                    <CardDescription>Adjust the sliders to reflect your current life satisfaction in each area.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ValueSliders categories={categories} scores={scores} onSliderChange={handleSliderChange} />
                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-muted-foreground">General Score</p>
                            <p className="text-4xl font-bold text-primary">{generalScore}</p>
                        </div>
                        <Button onClick={handleGetRecommendations} disabled={isPending} size="lg">
                            {isPending ? "Generating..." : "Get AI Recommendations"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full space-y-8">
                 <Card className="flex flex-col min-h-[400px] md:min-h-0 md:aspect-square">
                    <CardContent className="p-2 sm:p-4 w-full h-full flex flex-col">
                        <WheelOfLifeChart scores={scores} categories={categories} />
                    </CardContent>
                </Card>
                <RecommendationsDisplay recommendations={recommendations} isLoading={isPending} />
            </div>
        </div>
    );
}
