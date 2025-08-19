import { Module } from '@nestjs/common';
import { ProblemsModule } from './problems/problems.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ProblemsModule, UsersModule, TasksModule],
})
export class AppModule {}
