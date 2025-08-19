import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  getProblems() {
    return [{ id: 1, question: 'Calculate the mean of [2, 4, 6]', answer: '4' }];
  }
}
