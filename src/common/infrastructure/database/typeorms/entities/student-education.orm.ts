import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { StudentOrmEntity } from './student.orm';

export enum StudentEducationStatus {
  STUDYING = 'studying',
  GRADUATED = 'graduated',
}

@Entity('student_educations')
export class StudentEducationOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  student_id: number;

  @Column({ type: 'varchar' })
  level: string;

  @Column({ type: 'varchar' })
  field_of_study: string;

  @Column({ type: 'varchar' })
  current_occupation: string;

  @Column({ type: 'int' })
  work_experience: number;

  @Column({
    type: 'enum',
    enum: StudentEducationStatus,
  })
  status: StudentEducationStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date | null;

  @ManyToOne(() => StudentOrmEntity, (student) => student.educations)
  @JoinColumn({ name: 'student_id' })
  student: StudentOrmEntity;
}
