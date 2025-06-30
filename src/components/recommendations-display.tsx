"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

interface RecommendationsDisplayProps {
    recommendations: string | null;
    isLoading: boolean;
}

export default function RecommendationsDisplay({ recommendations, isLoading }: RecommendationsDisplayProps) {
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-3 p-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                </div>
            );
        }

        if (recommendations) {
            return recommendations.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">
                    {line}
                </p>
            ));
        }

        return (
            <div className="text-center text-muted-foreground py-8">
                <Lightbulb className="w-12 h-12 mx-auto mb-4" />
                <p className="font-medium">Your personalized recommendations will appear here.</p>
                <p className="text-sm">Adjust the sliders and click the button to get started.</p>
            </div>
        );
    };

    return (
        <Card className="w-full min-h-[200px]">
            <CardHeader>
                <CardTitle>
                    AI-Powered Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent className="text-card-foreground">
                {renderContent()}
            </CardContent>
        </Card>
    );
}
