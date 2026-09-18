import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job as BullJob } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job, JobStatus } from './job.entity.js';

@Processor('jobs')
export class JobProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
    super();
  }

  async process(job: BullJob): Promise<void> {
    const jobId = job.data.jobId;

    const dbJob = await this.jobRepository.findOne({
      where: { id: jobId },
    });

    if (!dbJob) {
      throw new Error(`Job ${jobId} not found`);
    }

    dbJob.status = JobStatus.RUNNING;
    await this.jobRepository.save(dbJob);

    console.log(`Processing job: ${jobId}`);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    dbJob.status = JobStatus.COMPLETED;
    await this.jobRepository.save(dbJob);

    console.log(`Job ${jobId} completed`);
  }
}