import { Module } from '@nestjs/common';
import { AlgebraController } from './algebra.controller';
import { AlgebraService } from './algebra.service';

/**
 * Module for algebra problems domain.
 * Registers controller and service for algebra endpoints and logic.
 */
@Module({
  controllers: [AlgebraController],
  providers: [AlgebraService],
})
export class AlgebraModule {}
