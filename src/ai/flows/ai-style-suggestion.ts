'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered style suggestions based on a client's desired look.
 *
 * - aiStyleSuggestion - A function that handles the AI style suggestion process.
 * - AIStyleSuggestionInput - The input type for the aiStyleSuggestion function.
 * - AIStyleSuggestionOutput - The return type for the aiStyleSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIStyleSuggestionInputSchema = z.object({
  desiredLookImage: z
    .string()
    .describe(
      "A photo of a desired hairstyle or look, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('An optional text description of the desired hairstyle or look.'),
});
export type AIStyleSuggestionInput = z.infer<typeof AIStyleSuggestionInputSchema>;

const AIStyleSuggestionOutputSchema = z.object({
  recommendedStylists: z.array(z.string()).describe('A list of stylists recommended for this look, chosen from Gifty, Fuseina, Pearl, Oprah, based on general expertise. If the look involves hair coloring, prioritize stylists with coloring expertise.'),
  suggestedHairColors: z.array(z.string()).describe('A list of hair colors appropriate for the desired look, considering common trends and salon capabilities (we can do various coloring techniques).'),
  similarStyles: z.array(z.string()).describe('A list of similar hairstyle suggestions that the salon can produce, based on our available services: Hair treatment, Wig making, Wig installation, Touch up, Washing of hair, Pony tail, Finger waves, Straightening of hair, Hair coloring.'),
});
export type AIStyleSuggestionOutput = z.infer<typeof AIStyleSuggestionOutputSchema>;

const prompt = ai.definePrompt({
  name: 'aiStyleSuggestionPrompt',
  input: {schema: AIStyleSuggestionInputSchema},
  output: {schema: AIStyleSuggestionOutputSchema},
  prompt: `You are an expert beauty salon assistant specializing in hairstyle and color recommendations for Elite Looks Booking salon.
Your goal is to analyze a client's desired look and provide recommendations based on the salon's capabilities.

**Salon Information:**
*   **Available Stylists:** Gifty, Fuseina, Pearl, Oprah. All stylists are highly skilled in a wide range of hair services including Hair treatment, Wig making, Wig installation, Touch up, Washing of hair, Pony tail, Finger waves, Straightening of hair, and Hair coloring.
*   **Hair Coloring:** We offer various hair coloring techniques.
*   **Similar Styles:** We can create a wide array of similar styles based on the listed services.

Analyze the provided image and description (if any) to determine the characteristics of the desired hairstyle, color, and overall look.
Based on this analysis and the salon's capabilities, provide the following:
1.  **Recommended Stylists:** Suggest 1-2 stylists who would be best suited for this look. Consider if the look prominently features coloring, in which case prioritize stylists who excel in hair coloring.
2.  **Suggested Hair Colors:** Propose 1-3 appropriate hair colors that would achieve or complement the desired look, keeping in mind current trends and our coloring capabilities.
3.  **Similar Styles:** Suggest 2-3 similar hairstyles that we can produce, giving the client more options.

Desired Look Image: {{media url=desiredLookImage}}
{{#if description}}
Description: {{{description}}}
{{/if}}`,
});

const aiStyleSuggestionFlow = ai.defineFlow(
  {
    name: 'aiStyleSuggestionFlow',
    inputSchema: AIStyleSuggestionInputSchema,
    outputSchema: AIStyleSuggestionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate style suggestions.');
    }
    return output;
  }
);

export async function aiStyleSuggestion(input: AIStyleSuggestionInput): Promise<AIStyleSuggestionOutput> {
  return aiStyleSuggestionFlow(input);
}
