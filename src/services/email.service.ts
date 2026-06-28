import { Resend } from 'resend';
import { emailQueue } from '@/lib/queue';
import { logger } from '@/lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY || 're_demo_123');

export class EmailService {
  /**
   * Adds an email job to the Redis queue for reliable background processing.
   */
  static async queueEmail(options: { to: string; subject: string; html: string }) {
    try {
      await emailQueue.add('send-email', options, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      });
      logger.info(`Email queued for ${options.to}`);
    } catch (error) {
      logger.error('Failed to queue email', { error, to: options.to });
    }
  }

  /**
   * Sends the email via Resend API (used by the background worker).
   */
  static async sendEmail(options: { to: string; subject: string; html: string }) {
    try {
      const data = await resend.emails.send({
        from: 'NovaFlow <noreply@novaflow.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async queueVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    await this.queueEmail({
      to: email,
      subject: 'Verify your NovaFlow account',
      html: `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`,
    });
  }

  static async queuePasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await this.queueEmail({
      to: email,
      subject: 'Reset your NovaFlow password',
      html: `<p>Reset your password by clicking <a href="${resetUrl}">here</a>.</p>`,
    });
  }
}
