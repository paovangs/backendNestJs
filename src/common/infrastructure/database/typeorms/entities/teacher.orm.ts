import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserOrmEntity } from './user.orm';

@Entity('teachers')
export class TeacherOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'text' })
  specialization: string;

  @Column({ type: 'int' })
  experience: number;

  @Column({ type: 'varchar', length: 255 })
  education: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @OneToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;
}
