"use client";

import type { WellbeingRecommendationsInput } from "@/ai/flows/generate-wellbeing-recommendations";
import { getAIRecommendations } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Briefcase, DollarSign, Heart, HeartPulse, Home, Smile, Users } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import RecommendationsDisplay from "./recommendations-display";
import ValueSliders from "./value-sliders";
import WheelOfLifeChart from "./wheel-of-life-chart";

const categories = [
    { key: "career", label: "Career & Work", icon: Briefcase, group: "work" },
    { key: "finances", label: "Finances & Money", icon: DollarSign, group: "work" },
    { key: "personalGrowth", label: "Personal Growth & Learning", icon: BrainCircuit, group: "work" },
    { key: "environment", label: "Physical Environment", icon: Home, group: "work" },
    { key: "health", label: "Health & Wellbeing", icon: HeartPulse, group: "health" },
    { key: "fun", label: "Fun & Recreation", icon: Smile, group: "health" },
    { key: "family", label: "Family & Friends", icon: Users, group: "relationships" },
    { key: "relationships", label: "Relationships & Love", icon: Heart, group: "relationships"  },
] as const;

type CategoryKey = typeof categories[number]['key'];

const initialScores: WellbeingRecommendationsInput = {
    career: 5,
    finances: 5,
    personalGrowth: 5,
    environment: 5,
    health: 5,
    fun: 5,
    family: 5,
    relationships: 5,
};

export default function LifeCompassApp({ hasEnvApiKey = true }: { hasEnvApiKey?: boolean }) {
    const [scores, setScores] = useState<WellbeingRecommendationsInput>(initialScores);
    const [apiKey, setApiKey] = useState("");
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
        if (!hasEnvApiKey && !apiKey.trim()) {
            toast({
                variant: "destructive",
                title: "API Key Required",
                description: "Please enter your Gemini API key to proceed.",
            });
            return;
        }

        startTransition(async () => {
            const result = await getAIRecommendations(scores, apiKey.trim() || undefined);
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
                     <div className="flex flex-col items-stretch xl:flex-row xl:items-end justify-between gap-6 pt-4">
                        <div className="text-center xl:text-left">
                            <p className="text-lg font-medium text-muted-foreground">General Score</p>
                            <p className="text-4xl font-bold text-primary">{generalScore}</p>
                        </div>
                        <div className="flex flex-col gap-3 w-full xl:w-auto">
                            {!hasEnvApiKey && (
                                <Input
                                    type="password"
                                    placeholder="Enter Gemini API Key..."
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="w-full"
                                />
                            )}
                            <Button onClick={handleGetRecommendations} disabled={isPending} size="lg" className="w-full">
                                {isPending ? "Generating..." : "Get AI Recommendations"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full space-y-8">
                 <Card className="flex flex-col min-h-[400px] md:min-h-0 md:aspect-square">
                    <CardContent className="p-2 sm:p-4 w-full flex-1 flex flex-col">
                        <WheelOfLifeChart scores={scores} categories={categories} />
                    </CardContent>
                </Card>
                <RecommendationsDisplay recommendations={recommendations} isLoading={isPending} />
            </div>
        </div>
    );
}
