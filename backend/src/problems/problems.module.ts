import { Module } from '@nestjs/common';
import { AlgebraModule } from './algebra/algebra.module';
import { TrigonometryModule } from './trigonometry/trigonometry.module';
import { GeometryModule } from './geometry/geometry.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [AlgebraModule, TrigonometryModule, GeometryModule, StatisticsModule],
})
export class ProblemsModule {}
