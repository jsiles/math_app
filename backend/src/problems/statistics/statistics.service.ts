import { Injectable } from '@nestjs/common';

/**
 * Service for statistics problem logic.
 * Handles generation and retrieval of statistics problems.
 */
@Injectable()
export class StatisticsService {
  /**
   * Returns a list of sample statistics problems.
   */
  getProblems() {
    return [{ id: 1, question: 'Calculate the mean of [2, 4, 6]', answer: '4' }];
  }
}
