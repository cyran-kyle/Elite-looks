'use server';

import {
  aiStyleSuggestion,
  type AIStyleSuggestionInput,
} from '@/ai/flows/ai-style-suggestion';
import { sendBookingConfirmation, sendBookingNotification } from '@/lib/email';
import { bookingSchema, type BookingFormValues } from '@/lib/schemas';


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


export async function submitBooking(data: BookingFormValues) {
  try {
    // Validate data on the server
    const validatedData = bookingSchema.parse(data);

    // Send emails in parallel
    await Promise.all([
      sendBookingConfirmation(validatedData),
      sendBookingNotification(validatedData),
    ]);

    return { success: true, message: 'Booking successful!' };
  } catch (error) {
    console.error('Booking submission error:', error);
    // Don't expose detailed server errors to the client
    return { success: false, error: 'Failed to submit booking. Please check your details and try again.' };
  }
}
