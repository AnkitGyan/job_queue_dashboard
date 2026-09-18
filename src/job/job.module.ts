import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity.js'
import { JobController } from './job.controller.js';
import { JobService } from './job.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService],
  exports: [TypeOrmModule],
})
export class JobModule {}
