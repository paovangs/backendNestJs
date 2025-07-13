import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { StudentEducationStatus } from 'src/common/infrastructure/database/typeorms/entities/student-education.orm';

export class AddEducationDto {
  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  field_of_study: string;

  @IsOptional()
  @IsString()
  current_occupation?: string;

  @IsNotEmpty()
  @IsInt()
  work_experience: number;

  @IsNotEmpty()
  @IsString()
  status: StudentEducationStatus;
}
