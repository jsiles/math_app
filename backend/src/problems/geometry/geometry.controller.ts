import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { GeometryService } from './geometry.service';
import { Problem } from '../problem.entity';

/**
 * Controller for geometry problem endpoints.
 * Provides routes to get, create, update, and delete geometry problems for students.
 */
@Controller('problems/geometry')
export class GeometryController {
  constructor(private readonly geometryService: GeometryService) {}

  /**
   * GET /problems/geometry
   * Returns a list of geometry problems.
   */
  @Get()
  @HttpCode(200)
  async getGeometryProblems(): Promise<Problem[]> {
    return this.geometryService.getProblems();
  }

  /**
   * GET /problems/geometry/:id
   * Returns a specific geometry problem by ID.
   */
  @Get(':id')
  @HttpCode(200)
  async getGeometryProblemById(@Param('id') id: number): Promise<Problem> {
    const problem = await this.geometryService.getProblemById(id);
    if (!problem) throw new NotFoundException('Problem not found');
    return problem;
  }

  /**
   * POST /problems/geometry
   * Creates a new geometry problem.
   */
  @Post()
  @HttpCode(201)
  async createGeometryProblem(@Body() data: Partial<Problem>): Promise<Problem> {
    return this.geometryService.createProblem(data);
  }

  /**
   * PUT /problems/geometry/:id
   * Updates an existing geometry problem by ID.
   */
  @Put(':id')
  @HttpCode(200)
  async updateGeometryProblem(@Param('id') id: number, @Body() data: Partial<Problem>): Promise<Problem> {
    const updated = await this.geometryService.updateProblem(id, data);
    if (!updated) throw new NotFoundException('Problem not found');
    return updated;
  }

  /**
   * DELETE /problems/geometry/:id
   * Deletes a geometry problem by ID.
   */
  @Delete(':id')
  @HttpCode(204)
  async deleteGeometryProblem(@Param('id') id: number): Promise<void> {
    const deleted = await this.geometryService.deleteProblem(id);
    if (!deleted) throw new NotFoundException('Problem not found');
  }
}
