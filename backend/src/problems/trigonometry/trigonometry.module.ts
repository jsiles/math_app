import { Module } from '@nestjs/common';
import { TrigonometryController } from './trigonometry.controller';
import { TrigonometryService } from './trigonometry.service';

/**
 * Module for trigonometry problems domain.
 * Registers controller and service for trigonometry endpoints and logic.
 */
@Module({
  controllers: [TrigonometryController],
  providers: [TrigonometryService],
})
export class TrigonometryModule {}
