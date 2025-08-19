import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../problem.entity';

/**
 * Service for statistics problem logic.
 * Handles CRUD operations for statistics problems in the database.
 */
@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  /**
   * Returns a list of sample statistics problems.
   */
  async getProblems(): Promise<Problem[]> {
    return this.problemRepository.find({ where: { topic: 'statistics' } });
  }

  async getProblemById(id: number): Promise<Problem | null> {
    return this.problemRepository.findOne({ where: { id, topic: 'statistics' } });
  }

  async createProblem(data: Partial<Problem>): Promise<Problem> {
    const problem = this.problemRepository.create({ ...data, topic: 'statistics' });
    return this.problemRepository.save(problem);
  }

  async updateProblem(id: number, data: Partial<Problem>): Promise<Problem | null> {
    const problem = await this.getProblemById(id);
    if (!problem) return null;
    Object.assign(problem, data);
    return this.problemRepository.save(problem);
  }

  async deleteProblem(id: number): Promise<boolean> {
    const result = await this.problemRepository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
