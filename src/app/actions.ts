'use server';

import { generateWellbeingRecommendations, type WellbeingRecommendationsInput } from "@/ai/flows/generate-wellbeing-recommendations";

export async function getAIRecommendations(input: WellbeingRecommendationsInput) {
    try {
        const result = await generateWellbeingRecommendations(input);
        return result.recommendations;
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return "Sorry, we couldn't generate recommendations at this time. Please try again later.";
    }
}
