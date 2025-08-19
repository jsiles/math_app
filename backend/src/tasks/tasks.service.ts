import { Injectable } from '@nestjs/common';

/**
 * Service for task logic.
 * Handles retrieval and management of tasks.
 */
@Injectable()
export class TasksService {
  /**
   * Returns a list of sample tasks.
   */
  getTasks() {
    return [{ id: 1, title: 'Solve algebra problem' }];
  }
}
