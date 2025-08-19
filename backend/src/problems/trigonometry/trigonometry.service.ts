import { Injectable } from '@nestjs/common';

/**
 * Service for trigonometry problem logic.
 * Handles generation and retrieval of trigonometry problems.
 */
@Injectable()
export class TrigonometryService {
  /**
   * Returns a list of sample trigonometry problems.
   */
  getProblems() {
    return [{ id: 1, question: 'Find sin(30°)', answer: '0.5' }];
  }
}
