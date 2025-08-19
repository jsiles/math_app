import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks() {
    return [{ id: 1, title: 'Solve algebra problem' }];
  }
}
