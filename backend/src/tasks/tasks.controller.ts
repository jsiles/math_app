import { Controller, Get } from '@nestjs/common';

/**
 * Controller for task endpoints.
 * Provides routes to get tasks data.
 */
@Controller('tasks')
export class TasksController {
  /**
   * GET /tasks
   * Returns a list of tasks.
   */
  @Get()
  getTasks() {
    return [{ id: 1, title: 'Solve algebra problem' }];
  }
}
