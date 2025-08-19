import { Controller, Get } from '@nestjs/common';
import { GeometryService } from './geometry.service';

@Controller('problems/geometry')
export class GeometryController {
  constructor(private readonly geometryService: GeometryService) {}

  @Get()
  getGeometryProblems() {
    return this.geometryService.getProblems();
  }
}
