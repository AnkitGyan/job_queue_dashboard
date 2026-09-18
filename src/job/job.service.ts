import { Injectable,  NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from './job.entity.js'
import { CreateJobDto } from './dto/create-job.dto.js';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';


@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectQueue('jobs')
    private readonly jobQueue: Queue,
  ) {}

   async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);

    return this.jobRepository.save(job);
  }

    async findAll(): Promise<Job[]> {
    return this.jobRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

    async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    return job;
  }

    async remove(id: string): Promise<void> {
    const job = await this.jobRepository.findOne({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }

    await this.jobRepository.remove(job);
  }

    async run(id: string): Promise<Job> {
    const job = await this.findOne(id);

    job.status = JobStatus.PENDING;
    const savedJob = await this.jobRepository.save(job);

    await this.jobQueue.add('execute-job', {
      jobId: savedJob.id,
    });

    return savedJob;
  }
}