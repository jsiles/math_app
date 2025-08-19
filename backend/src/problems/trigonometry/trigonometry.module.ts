import { Module } from '@nestjs/common';
import { TrigonometryController } from './trigonometry.controller';
import { TrigonometryService } from './trigonometry.service';

@Module({
  controllers: [TrigonometryController],
  providers: [TrigonometryService],
})
export class TrigonometryModule {}
