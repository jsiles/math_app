import { Controller, Get } from '@nestjs/common';
import { AlgebraService } from './algebra.service';

/**
 * Controller for algebra problem endpoints.
 * Provides routes to get algebra problems for students.
 */
@Controller('problems/algebra')
export class AlgebraController {
  constructor(private readonly algebraService: AlgebraService) {}

  /**
   * GET /problems/algebra
   * Returns a list of algebra problems.
   */
  @Get()
  getAlgebraProblems() {
    return this.algebraService.getProblems();
  }
}
