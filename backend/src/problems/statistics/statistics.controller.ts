import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Problem } from '../problem.entity';

/**
 * Controller for statistics problem endpoints.
 * Provides routes to get, create, update, and delete statistics problems for students.
 */
@Controller('problems/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * GET /problems/statistics
   * Returns a list of statistics problems.
   */
  @Get()
  @HttpCode(200)
  async getStatisticsProblems(): Promise<Problem[]> {
    return this.statisticsService.getProblems();
  }

  /**
   * GET /problems/statistics/:id
   * Returns a specific statistics problem by ID.
   */
  @Get(':id')
  @HttpCode(200)
  async getStatisticsProblemById(@Param('id') id: number): Promise<Problem> {
    const problem = await this.statisticsService.getProblemById(id);
    if (!problem) throw new NotFoundException('Problem not found');
    return problem;
  }

  /**
   * POST /problems/statistics
   * Creates a new statistics problem.
   */
  @Post()
  @HttpCode(201)
  async createStatisticsProblem(@Body() data: Partial<Problem>): Promise<Problem> {
    return this.statisticsService.createProblem(data);
  }

  /**
   * PUT /problems/statistics/:id
   * Updates an existing statistics problem by ID.
   */
  @Put(':id')
  @HttpCode(200)
  async updateStatisticsProblem(@Param('id') id: number, @Body() data: Partial<Problem>): Promise<Problem> {
    const updated = await this.statisticsService.updateProblem(id, data);
    if (!updated) throw new NotFoundException('Problem not found');
    return updated;
  }

  /**
   * DELETE /problems/statistics/:id
   * Deletes a statistics problem by ID.
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteStatisticsProblem(@Param('id') id: number): Promise<void> {
    const deleted = await this.statisticsService.deleteProblem(id);
    if (!deleted) throw new NotFoundException('Problem not found');
  }
}
