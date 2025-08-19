import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrigonometryController } from './trigonometry.controller';
import { TrigonometryService } from './trigonometry.service';
import { Problem } from '../problem.entity';

/**
 * Module for trigonometry problems domain.
 * Registers controller and service for trigonometry endpoints and logic.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [TrigonometryController],
  providers: [TrigonometryService],
})
export class TrigonometryModule {}
