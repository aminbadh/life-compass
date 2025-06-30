'use server';
/**
 * @fileOverview AI-powered recommendations based on Wheel of Life scores.
 *
 * - generateWellbeingRecommendations - A function that generates personalized recommendations.
 * - WellbeingRecommendationsInput - The input type for the generateWellbeingRecommendations function.
 * - WellbeingRecommendationsOutput - The return type for the generateWellbeingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellbeingRecommendationsInputSchema = z.object({
  career: z.number().describe('Score for Career & Work (1-10)'),
  finances: z.number().describe('Score for Finances & Money (1-10)'),
  personalGrowth: z.number().describe('Score for Personal Growth & Learning (1-10)'),
  environment: z.number().describe('Score for Physical Environment (1-10)'),
  health: z.number().describe('Score for Health & Wellbeing (1-10)'),
  fun: z.number().describe('Score for Fun & Recreation (1-10)'),
  family: z.number().describe('Score for Family & Friends (1-10)'),
  relationships: z.number().describe('Score for Relationships & Love (1-10)'),
});
export type WellbeingRecommendationsInput = z.infer<typeof WellbeingRecommendationsInputSchema>;

const WellbeingRecommendationsOutputSchema = z.object({
  recommendations: z.string().describe('Personalized recommendations for areas of improvement.'),
});
export type WellbeingRecommendationsOutput = z.infer<typeof WellbeingRecommendationsOutputSchema>;

export async function generateWellbeingRecommendations(
  input: WellbeingRecommendationsInput
): Promise<WellbeingRecommendationsOutput> {
  return generateWellbeingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wellbeingRecommendationsPrompt',
  input: {schema: WellbeingRecommendationsInputSchema},
  output: {schema: WellbeingRecommendationsOutputSchema},
  prompt: `You are a wellbeing coach. Analyze the following Wheel of Life scores and provide personalized, actionable recommendations for the user. Focus on areas with lower scores to provide specific advice for improvement.

Career & Work: {{career}}
Finances & Money: {{finances}}
Personal Growth & Learning: {{personalGrowth}}
Physical Environment: {{environment}}
Health & Wellbeing: {{health}}
Fun & Recreation: {{fun}}
Family & Friends: {{family}}
Relationships & Love: {{relationships}}

Recommendations:`,
});

const generateWellbeingRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateWellbeingRecommendationsFlow',
    inputSchema: WellbeingRecommendationsInputSchema,
    outputSchema: WellbeingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
