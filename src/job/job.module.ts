import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity.js'
import { JobController } from './job.controller.js';
import { JobService } from './job.service.js';
import { BullModule } from '@nestjs/bullmq';
import { JobProcessor } from './job.processor.js';

@Module({
  imports: [TypeOrmModule.forFeature([Job]),

  BullModule.registerQueue({
  name: 'jobs',
})
],
  controllers: [JobController],
  providers: [JobService, JobProcessor],
  exports: [TypeOrmModule],
})
export class JobModule {}
