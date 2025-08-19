import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsModule } from './problems/problems.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Problem } from './problems/problem.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'problems.db',
      entities: [Problem, User],
      synchronize: true,
    }),
    ProblemsModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
