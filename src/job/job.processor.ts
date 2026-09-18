import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job as BullJob } from 'bullmq';

@Processor('jobs')
export class JobProcessor extends WorkerHost {
  async process(job: BullJob): Promise<void> {
    console.log(`Processing job: ${job.id}`);
    console.log('Job data:', job.data);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(`Job ${job.id} completed`);
  }
}