import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_123'
    );
  } catch (error: any) {
    logger.error('Stripe Webhook signature verification failed.', error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as any;
        await prisma.payment.update({
          where: { stripeIntentId: paymentIntent.id },
          data: { status: 'COMPLETED' },
        });
        logger.info(`Payment succeeded for intent ${paymentIntent.id}`);
        break;
      
      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as any;
        await prisma.payment.update({
          where: { stripeIntentId: failedIntent.id },
          data: { status: 'FAILED' },
        });
        logger.warn(`Payment failed for intent ${failedIntent.id}`);
        break;

      default:
        // Unhandled event type
        break;
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    logger.error('Stripe Webhook Handler Error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
