import { Queue, Worker, Job } from 'bullmq';
import { redis } from './redis';
import { logger } from './logger';

export const emailQueue = new Queue('email-queue', { connection: redis as any });
export const imageQueue = new Queue('image-queue', { connection: redis as any });
export const reportQueue = new Queue('report-queue', { connection: redis as any });

// Initialize workers only in Node environment, not on the Edge
if (typeof window === 'undefined' && process.env.NEXT_RUNTIME !== 'edge') {
  
  // Email Worker
  new Worker('email-queue', async (job: Job) => {
    logger.info(`Processing email job ${job.id}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    logger.info(`Email job ${job.id} completed.`);
  }, { connection: redis as any });

  // Image Worker
  new Worker('image-queue', async (job: Job) => {
    logger.info(`Processing image job ${job.id}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    logger.info(`Image job ${job.id} completed.`);
  }, { connection: redis as any });

  // Report Worker
  new Worker('report-queue', async (job: Job) => {
    logger.info(`Processing report job ${job.id}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    logger.info(`Report job ${job.id} completed.`);
  }, { connection: redis as any });

}
