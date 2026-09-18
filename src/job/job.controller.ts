import { Controller } from '@nestjs/common';
import { JobService } from './job.service.js';
import { Post, Body } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto.js';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }
}