import { Injectable } from '@nestjs/common';

@Injectable()
export class TrigonometryService {
  getProblems() {
    return [{ id: 1, question: 'Find sin(30°)', answer: '0.5' }];
  }
}
