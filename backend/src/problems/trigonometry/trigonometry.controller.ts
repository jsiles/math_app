import { Controller, Get } from '@nestjs/common';
import { TrigonometryService } from './trigonometry.service';

@Controller('problems/trigonometry')
export class TrigonometryController {
  constructor(private readonly trigonometryService: TrigonometryService) {}

  @Get()
  getTrigonometryProblems() {
    return this.trigonometryService.getProblems();
  }
}
