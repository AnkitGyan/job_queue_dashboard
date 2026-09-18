import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity.js'

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class JobModule {}
