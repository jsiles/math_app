import { Controller, Get } from '@nestjs/common';
import { GeometryService } from './geometry.service';

/**
 * Controller for geometry problem endpoints.
 * Provides routes to get geometry problems for students.
 */
@Controller('problems/geometry')
export class GeometryController {
  constructor(private readonly geometryService: GeometryService) {}

  /**
   * GET /problems/geometry
   * Returns a list of geometry problems.
   */
  @Get()
  getGeometryProblems() {
    return this.geometryService.getProblems();
  }
}
