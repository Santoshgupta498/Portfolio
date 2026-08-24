import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { ContactFormData } from '../models/portfolio.models';

/**
 * EmailJS Configuration
 * 
 * To set up email receiving:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an Email Service (Gmail, Outlook, etc.) — you'll get a SERVICE_ID
 * 3. Create an Email Template with these variables:
 *    - {{from_name}} — sender's name
 *    - {{from_email}} — sender's email
 *    - {{subject}} — email subject
 *    - {{message}} — email message
 *    You'll get a TEMPLATE_ID
 * 4. Go to Account > API Keys — copy your PUBLIC_KEY
 * 5. Replace the values below with your actual IDs
 */

const EMAILJS_SERVICE_ID = 'service_w8p9ybm';    // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_cnhow1k';  // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'wY1MeiQO_M6UktsHk';     // Replace with your EmailJS public key

@Injectable({ providedIn: 'root' })
export class EmailService {

  async sendEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Santosh Gupta'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        return { success: true, message: 'Message sent successfully! I will respond shortly.' };
      }

      return { success: false, message: 'Failed to send message. Please try again.' };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { success: false, message: 'Failed to send message. Please try again or email me directly.' };
    }
  }
}
