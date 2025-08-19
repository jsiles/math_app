import { Injectable } from '@nestjs/common';

/**
 * Service for algebra problem logic.
 * Handles generation and retrieval of algebra problems.
 */
@Injectable()
export class AlgebraService {
  /**
   * Returns a list of sample algebra problems.
   */
  getProblems() {
    return [{ id: 1, question: 'Solve x + 2 = 5', answer: 'x = 3' }];
  }
}
