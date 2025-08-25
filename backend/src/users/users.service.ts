import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

/**
 * Service for user logic.
 * Handles CRUD operations for users in the database.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    const password = (data as any).password;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.socialSession = JSON.stringify({ password: hashedPassword });
    }
    return this.userRepository.save(user);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) return null;
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== undefined && result.affected > 0;
  }
}
