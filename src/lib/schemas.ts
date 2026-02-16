import * as z from 'zod';

export const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service.'),
  stylist: z.string().min(1, 'Please select a stylist.'),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, 'Please select a time.'),
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
