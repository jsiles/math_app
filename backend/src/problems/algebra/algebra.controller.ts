import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { AlgebraService } from './algebra.service';
import { Problem } from '../problem.entity';

/**
 * Controller for algebra problem endpoints.
 * Provides routes to get, create, update, and delete algebra problems for students.
 */
@Controller('problems/algebra')
export class AlgebraController {
  constructor(private readonly algebraService: AlgebraService) {}

  /**
   * GET /problems/algebra
   * Returns a list of algebra problems.
   * Status: 200 OK
   */
  @Get()
  @HttpCode(200)
  async getAlgebraProblems(): Promise<Problem[]> {
    return this.algebraService.getProblems();
  }

  /**
   * GET /problems/algebra/:id
   * Returns a single algebra problem by ID.
   * Status: 200 OK or 404 Not Found
   */
  @Get(':id')
  @HttpCode(200)
  async getAlgebraProblemById(@Param('id') id: number): Promise<Problem> {
    const problem = await this.algebraService.getProblemById(id);
    if (!problem) throw new NotFoundException('Problem not found');
    return problem;
  }

  /**
   * POST /problems/algebra
   * Creates a new algebra problem.
   * Status: 201 Created
   */
  @Post()
  @HttpCode(201)
  async createAlgebraProblem(@Body() data: Partial<Problem>): Promise<Problem> {
    return this.algebraService.createProblem(data);
  }

  /**
   * PUT /problems/algebra/:id
   * Updates an existing algebra problem by ID.
   * Status: 200 OK or 404 Not Found
   */
  @Put(':id')
  @HttpCode(200)
  async updateAlgebraProblem(@Param('id') id: number, @Body() data: Partial<Problem>): Promise<Problem> {
    const updated = await this.algebraService.updateProblem(id, data);
    if (!updated) throw new NotFoundException('Problem not found');
    return updated;
  }

  /**
   * DELETE /problems/algebra/:id
   * Deletes an algebra problem by ID.
   * Status: 204 No Content or 404 Not Found
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteAlgebraProblem(@Param('id') id: number): Promise<void> {
    const deleted = await this.algebraService.deleteProblem(id);
    if (!deleted) throw new NotFoundException('Problem not found');
  }
}
