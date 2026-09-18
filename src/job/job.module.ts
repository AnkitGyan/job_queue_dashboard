import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity.js'
import { JobController } from './job.controller.js';
import { JobService } from './job.service.js';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [TypeOrmModule.forFeature([Job]),

  BullModule.registerQueue({
  name: 'jobs',
})
],
  controllers: [JobController],
  providers: [JobService],
  exports: [TypeOrmModule],
})
export class JobModule {}
