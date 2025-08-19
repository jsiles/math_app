import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Problem } from '../problem.entity';

/**
 * Module for statistics problems domain.
 * Registers controller and service for statistics endpoints and logic.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
