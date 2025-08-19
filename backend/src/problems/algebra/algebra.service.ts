import { Injectable } from '@nestjs/common';

@Injectable()
export class AlgebraService {
  getProblems() {
    return [{ id: 1, question: 'Solve x + 2 = 5', answer: 'x = 3' }];
  }
}
