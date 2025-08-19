import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getTasks() {
    return [{ id: 1, title: 'Solve algebra problem' }];
  }
}
