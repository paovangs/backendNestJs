import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { StudentOrmEntity } from './student.orm';
import { TeacherOrmEntity } from './teacher.orm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @OneToOne(() => StudentOrmEntity, (student) => student.user)
  student: StudentOrmEntity;

  @OneToOne(() => TeacherOrmEntity, (teacher) => teacher.user)
  teacher: TeacherOrmEntity;
}
