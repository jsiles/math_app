import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entity representing a user in the system.
 * Includes role, social login info, and session data.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identifier: string; // Could be email, username, or external ID

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: 'student' })
  role: 'student' | 'teacher' | 'admin';

  @Column({ nullable: true })
  socialProvider?: string; // e.g. 'google', 'facebook', etc.

  @Column({ nullable: true, type: 'text' })
  socialSession?: string; // JSON string with session/token info
}
