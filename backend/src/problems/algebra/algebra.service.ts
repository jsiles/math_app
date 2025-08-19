import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../problem.entity';

/**
 * Service for algebra problem logic.
 * Handles CRUD operations for algebra problems in the database.
 */
@Injectable()
export class AlgebraService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  /**
   * Returns a list of algebra problems from the database.
   */
  async getProblems(): Promise<Problem[]> {
    return this.problemRepository.find({ where: { topic: 'algebra' } });
  }

  /**
   * Returns a single algebra problem by ID.
   */
  async getProblemById(id: number): Promise<Problem | null> {
    return this.problemRepository.findOne({ where: { id, topic: 'algebra' } });
  }

  /**
   * Creates a new algebra problem.
   */
  async createProblem(data: Partial<Problem>): Promise<Problem> {
    const problem = this.problemRepository.create({ ...data, topic: 'algebra' });
    return this.problemRepository.save(problem);
  }

  /**
   * Updates an existing algebra problem by ID.
   */
  async updateProblem(id: number, data: Partial<Problem>): Promise<Problem | null> {
    const problem = await this.getProblemById(id);
    if (!problem) return null;
    Object.assign(problem, data);
    return this.problemRepository.save(problem);
  }

  /**
   * Deletes an algebra problem by ID.
   */
  async deleteProblem(id: number): Promise<boolean> {
    const result = await this.problemRepository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
