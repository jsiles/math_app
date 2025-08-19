import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entity representing a math problem in the database.
 */
@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string; // e.g. 'algebra', 'geometry', etc.

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  difficulty?: string;
}
