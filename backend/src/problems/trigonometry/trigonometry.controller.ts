import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { TrigonometryService } from './trigonometry.service';
import { Problem } from '../problem.entity';

/**
 * Controller for trigonometry problem endpoints.
 * Provides routes to get, create, update, and delete trigonometry problems for students.
 */
@Controller('problems/trigonometry')
export class TrigonometryController {
  constructor(private readonly trigonometryService: TrigonometryService) {}

  /**
   * GET /problems/trigonometry
   * Returns a list of trigonometry problems.
   */
  @Get()
  @HttpCode(200)
  async getTrigonometryProblems(): Promise<Problem[]> {
    return this.trigonometryService.getProblems();
  }

  /**
   * GET /problems/trigonometry/:id
   * Returns a specific trigonometry problem by ID.
   */
  @Get(':id')
  @HttpCode(200)
  async getTrigonometryProblemById(@Param('id') id: number): Promise<Problem> {
    const problem = await this.trigonometryService.getProblemById(id);
    if (!problem) throw new NotFoundException('Problem not found');
    return problem;
  }

  /**
   * POST /problems/trigonometry
   * Creates a new trigonometry problem.
   */
  @Post()
  @HttpCode(201)
  async createTrigonometryProblem(@Body() data: Partial<Problem>): Promise<Problem> {
    return this.trigonometryService.createProblem(data);
  }

  /**
   * PUT /problems/trigonometry/:id
   * Updates an existing trigonometry problem by ID.
   */
  @Put(':id')
  @HttpCode(200)
  async updateTrigonometryProblem(@Param('id') id: number, @Body() data: Partial<Problem>): Promise<Problem> {
    const updated = await this.trigonometryService.updateProblem(id, data);
    if (!updated) throw new NotFoundException('Problem not found');
    return updated;
  }

  /**
   * DELETE /problems/trigonometry/:id
   * Deletes a trigonometry problem by ID.
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteTrigonometryProblem(@Param('id') id: number): Promise<void> {
    const deleted = await this.trigonometryService.deleteProblem(id);
    if (!deleted) throw new NotFoundException('Problem not found');
  }
}
