"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            return (
                     <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="space-y-4"
                        components={{
                            p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2" {...props} />,
                            li: ({node, ...props}) => <li className="text-muted-foreground" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                        }}
                    >
                    {recommendations}
                </ReactMarkdown>
            );
        }

        return (
            <div className="text-center text-muted-foreground py-8">
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
