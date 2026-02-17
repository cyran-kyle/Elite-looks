import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { BookingFormValues, ReviewFormValues } from './schemas';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const getCustomerConfirmationHtml = (data: BookingFormValues) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #291630; text-align: center;">Booking Confirmation</h1>
      <p>Dear ${data.name},</p>
      <p>Thank you for booking with Jomez Glow Spa! Your appointment is confirmed.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
        <h2 style="color: #6A1B9A; margin-top: 0;">Appointment Details:</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;"><strong>Service:</strong> ${data.service}</li>
          <li style="margin-bottom: 10px;"><strong>Stylist:</strong> ${data.stylist}</li>
          <li style="margin-bottom: 10px;"><strong>Date:</strong> ${format(data.date, 'PPPP')}</li>
          <li><strong>Time:</strong> ${data.time}</li>
        </ul>
      </div>
      <div style="margin-top: 25px; padding: 15px; border: 1px solid #E0B0FF; border-radius: 4px; background-color: #FAF5FF;">
        <h3 style="color: #6A1B9A; margin-top: 0;">Important: Payment Information</h3>
        <p style="margin-bottom: 10px;">Please note that your booking is validated upon payment.</p>
        <p style="margin-bottom: 10px;"><strong>Payment Number:</strong> +233243333371</p>
        <p>After payment, please send proof of payment to us via WhatsApp.</p>
        <a href="https://wa.me/233243333371" style="display: inline-block; background-color: #25D366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-weight: bold;">Send Proof of Payment on WhatsApp</a>
      </div>
      <p style="margin-top: 20px;">We look forward to seeing you!</p>
      <p>Best regards,<br/>The Jomez Glow Spa Team</p>
    </div>
  </div>
`;

const getOwnerNotificationHtml = (data: BookingFormValues) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #291630; text-align: center;">New Booking Notification</h1>
      <p>A new appointment has been booked.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
        <h2 style="color: #6A1B9A; margin-top: 0;">Appointment Details:</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;"><strong>Client Name:</strong> ${data.name}</li>
          <li style="margin-bottom: 10px;"><strong>Client Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
          <li style="margin-bottom: 10px;"><strong>Service:</strong> ${data.service}</li>
          <li style="margin-bottom: 10px;"><strong>Stylist:</strong> ${data.stylist}</li>
          <li style="margin-bottom: 10px;"><strong>Date:</strong> ${format(data.date, 'PPPP')}</li>
          <li><strong>Time:</strong> ${data.time}</li>
        </ul>
      </div>
    </div>
  </div>
`;

const getReviewNotificationHtml = (data: ReviewFormValues) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #291630; text-align: center;">New Review/Suggestion</h1>
      <p>You have received a new message from the website.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
        <h2 style="color: #6A1B9A; margin-top: 0;">Message Details:</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;"><strong>From:</strong> ${data.name}</li>
          <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
        </ul>
        <h3 style="color: #6A1B9A; margin-top: 15px;">Message:</h3>
        <p style="background-color: #fff; padding: 10px; border-radius: 4px; border: 1px solid #eee;">${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  </div>
`;

export async function sendBookingConfirmation(data: BookingFormValues) {
  const mailOptions = {
    from: `"Jomez Glow Spa Booking" <${process.env.GMAIL_EMAIL}>`,
    to: data.email,
    subject: 'Your Jomez Glow Spa Appointment is Confirmed!',
    html: getCustomerConfirmationHtml(data),
  };

  await transporter.sendMail(mailOptions);
}

export async function sendBookingNotification(data: BookingFormValues) {
  if (!process.env.SALON_OWNER_EMAIL) {
    console.warn('SALON_OWNER_EMAIL is not set. Skipping owner notification.');
    return;
  }
  const mailOptions = {
    from: `"Jomez Glow Spa Booking" <${process.env.GMAIL_EMAIL}>`,
    to: process.env.SALON_OWNER_EMAIL,
    subject: `New Booking: ${data.service} with ${data.stylist} on ${format(data.date, 'PPP')}`,
    html: getOwnerNotificationHtml(data),
  };

  await transporter.sendMail(mailOptions);
}

export async function sendReviewNotification(data: ReviewFormValues) {
  if (!process.env.SALON_OWNER_EMAIL) {
    console.warn('SALON_OWNER_EMAIL is not set. Skipping review notification.');
    throw new Error('Salon owner email is not configured.');
  }
  const mailOptions = {
    from: `"Jomez Glow Spa Website" <${process.env.GMAIL_EMAIL}>`,
    to: process.env.SALON_OWNER_EMAIL,
    subject: `New Review/Suggestion from ${data.name}`,
    html: getReviewNotificationHtml(data),
  };

  await transporter.sendMail(mailOptions);
}
