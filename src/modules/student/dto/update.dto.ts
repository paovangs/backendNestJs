import {
  IsString,
  IsEmail,
  IsDateString,
  IsIn,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: string;

  @IsIn(['male', 'female'])
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
