import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * Module for tasks management domain.
 * Registers controller and service for tasks endpoints and logic.
 */
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
