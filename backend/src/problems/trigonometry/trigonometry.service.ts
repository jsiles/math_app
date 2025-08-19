import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../problem.entity';

/**
 * Service for trigonometry problem logic.
 * Handles CRUD operations for trigonometry problems in the database.
 */
@Injectable()
export class TrigonometryService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  /**
   * Returns a list of trigonometry problems from the database.
   */
  async getProblems(): Promise<Problem[]> {
    return this.problemRepository.find({ where: { topic: 'trigonometry' } });
  }

  /**
   * Returns a specific trigonometry problem by ID.
   */
  async getProblemById(id: number): Promise<Problem | null> {
    return this.problemRepository.findOne({ where: { id, topic: 'trigonometry' } });
  }

  /**
   * Creates a new trigonometry problem.
   */
  async createProblem(data: Partial<Problem>): Promise<Problem> {
    const problem = this.problemRepository.create({ ...data, topic: 'trigonometry' });
    return this.problemRepository.save(problem);
  }

  /**
   * Updates an existing trigonometry problem.
   */
  async updateProblem(id: number, data: Partial<Problem>): Promise<Problem | null> {
    const problem = await this.getProblemById(id);
    if (!problem) return null;
    Object.assign(problem, data);
    return this.problemRepository.save(problem);
  }

  /**
   * Deletes a trigonometry problem by ID.
   */
  async deleteProblem(id: number): Promise<boolean> {
    const result = await this.problemRepository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
