import { Module } from '@nestjs/common';
import { AlgebraController } from './algebra.controller';
import { AlgebraService } from './algebra.service';

@Module({
  controllers: [AlgebraController],
  providers: [AlgebraService],
})
export class AlgebraModule {}
