import { Module } from '@nestjs/common';
import { GeometryController } from './geometry.controller';
import { GeometryService } from './geometry.service';

/**
 * Module for geometry problems domain.
 * Registers controller and service for geometry endpoints and logic.
 */
@Module({
  controllers: [GeometryController],
  providers: [GeometryService],
})
export class GeometryModule {}
