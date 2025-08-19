import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

/**
 * Module for statistics problems domain.
 * Registers controller and service for statistics endpoints and logic.
 */
@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
