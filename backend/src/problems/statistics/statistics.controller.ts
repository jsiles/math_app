import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

/**
 * Controller for statistics problem endpoints.
 * Provides routes to get statistics problems for students.
 */
@Controller('problems/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * GET /problems/statistics
   * Returns a list of statistics problems.
   */
  @Get()
  getStatisticsProblems() {
    return this.statisticsService.getProblems();
  }
}
