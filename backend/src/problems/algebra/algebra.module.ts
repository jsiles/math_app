import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgebraController } from './algebra.controller';
import { AlgebraService } from './algebra.service';
import { Problem } from '../problem.entity';

/**
 * Module for algebra problems domain.
 * Registers controller and service for algebra endpoints and logic.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [AlgebraController],
  providers: [AlgebraService],
})
export class AlgebraModule {}
