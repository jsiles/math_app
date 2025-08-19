import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../problem.entity';

/**
 * Service for geometry problem logic.
 * Handles CRUD operations for geometry problems in the database.
 */
@Injectable()
export class GeometryService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  /**
   * Returns a list of geometry problems from the database.
   */
  async getProblems(): Promise<Problem[]> {
    return this.problemRepository.find({ where: { topic: 'geometry' } });
  }

  /**
   * Returns a specific geometry problem by its ID.
   */
  async getProblemById(id: number): Promise<Problem | null> {
    return this.problemRepository.findOne({ where: { id, topic: 'geometry' } });
  }

  /**
   * Creates a new geometry problem.
   */
  async createProblem(data: Partial<Problem>): Promise<Problem> {
    const problem = this.problemRepository.create({ ...data, topic: 'geometry' });
    return this.problemRepository.save(problem);
  }

  /**
   * Updates an existing geometry problem.
   */
  async updateProblem(id: number, data: Partial<Problem>): Promise<Problem | null> {
    const problem = await this.getProblemById(id);
    if (!problem) return null;
    Object.assign(problem, data);
    return this.problemRepository.save(problem);
  }

  /**
   * Deletes a geometry problem by its ID.
   */
  async deleteProblem(id: number): Promise<boolean> {
    const result = await this.problemRepository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
