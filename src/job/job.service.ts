import { Injectable,  NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity.js'
import { CreateJobDto } from './dto/create-job.dto.js';


@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
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
}