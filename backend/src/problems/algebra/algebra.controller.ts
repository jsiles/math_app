import { Controller, Get } from '@nestjs/common';
import { AlgebraService } from './algebra.service';

@Controller('problems/algebra')
export class AlgebraController {
  constructor(private readonly algebraService: AlgebraService) {}

  @Get()
  getAlgebraProblems() {
    return this.algebraService.getProblems();
  }
}
