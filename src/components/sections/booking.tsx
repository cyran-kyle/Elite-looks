'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { bookingSchema, type BookingFormValues } from '@/lib/schemas';
import { services, stylists, timeSlots } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CalendarIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { submitBooking } from '@/app/actions';

const Booking = () => {
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      stylist: '',
      time: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    const result = await submitBooking(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsBooked(true);
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment for ${data.service} with ${data.stylist} on ${format(data.date, 'PPP')} at ${data.time} is confirmed.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: "Booking Failed",
        description: result.error || "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (isBooked) {
    return (
      <section id="booking" className="py-16 sm:py-24">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                 <CheckCircle2 className="h-10 w-10" />
              </div>
              <CardTitle className="font-headline text-3xl mt-4">Thank You for Booking!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">Your appointment has been successfully scheduled. A confirmation email has been sent to you.</p>
              <Button onClick={() => { setIsBooked(false); form.reset(); }} className="mt-6">
                Book Another Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-16 sm:py-24">
      <div className="container">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Book Your Appointment</CardTitle>
            <CardDescription className="text-lg">
              Choose your service, stylist, and preferred time. We can&apos;t wait to see you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stylist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stylist</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a stylist" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stylists.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map(time => (
                               <SelectItem key={time} value={time}>{time}</SelectItem> 
                            ))}
                          </SelectContent>
                        </Select>
                       <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                            <Input placeholder="jane.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Confirm Booking'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Booking;
