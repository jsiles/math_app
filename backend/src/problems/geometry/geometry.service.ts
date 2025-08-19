import { Injectable } from '@nestjs/common';

/**
 * Service for geometry problem logic.
 * Handles generation and retrieval of geometry problems.
 */
@Injectable()
export class GeometryService {
  /**
   * Returns a list of sample geometry problems.
   */
  getProblems() {
    return [{ id: 1, question: 'Calculate the area of a circle with radius 2', answer: '12.57' }];
  }
}
