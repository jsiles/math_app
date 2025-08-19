import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

/**
 * Module for tasks management domain.
 * Registers controller and service for tasks endpoints and logic.
 */
@Module({
  imports: [TypeOrmModule.forFeature([])], // Agregar entidades aquí cuando se definan
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
