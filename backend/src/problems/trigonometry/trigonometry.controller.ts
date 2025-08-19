import { Controller, Get } from '@nestjs/common';
import { TrigonometryService } from './trigonometry.service';

/**
 * Controller for trigonometry problem endpoints.
 * Provides routes to get trigonometry problems for students.
 */
@Controller('problems/trigonometry')
export class TrigonometryController {
  constructor(private readonly trigonometryService: TrigonometryService) {}

  /**
   * GET /problems/trigonometry
   * Returns a list of trigonometry problems.
   */
  @Get()
  getTrigonometryProblems() {
    return this.trigonometryService.getProblems();
  }
}
