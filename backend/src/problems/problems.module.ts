import { Module } from '@nestjs/common';
import { AlgebraModule } from './algebra/algebra.module';
import { TrigonometryModule } from './trigonometry/trigonometry.module';
import { GeometryModule } from './geometry/geometry.module';
import { StatisticsModule } from './statistics/statistics.module';

/**
 * Main module for all math problems domains.
 * Aggregates algebra, trigonometry, geometry, and statistics modules.
 */
@Module({
  imports: [AlgebraModule, TrigonometryModule, GeometryModule, StatisticsModule],
})
export class ProblemsModule {}
