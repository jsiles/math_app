import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('problems/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatisticsProblems() {
    return this.statisticsService.getProblems();
  }
}
