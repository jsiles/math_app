import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeometryController } from './geometry.controller';
import { GeometryService } from './geometry.service';
import { Problem } from '../problem.entity';

/**
 * Module for geometry problems domain.
 * Registers controller and service for geometry endpoints and logic.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [GeometryController],
  providers: [GeometryService],
})
export class GeometryModule {}
