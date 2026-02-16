'use server';

import {
  aiStyleSuggestion,
  type AIStyleSuggestionInput,
} from '@/ai/flows/ai-style-suggestion';

export async function getAIStyleSuggestion(input: AIStyleSuggestionInput) {
  try {
    const result = await aiStyleSuggestion(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      success: false,
      error: `Failed to get AI suggestions: ${errorMessage}`,
    };
  }
}
