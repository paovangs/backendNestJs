import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseCategoryOrmEntity } from 'src/common/infrastructure/database/typeorms/entities/course-category.orm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseCategoryOrmEntity)
    private _courseCategory: Repository<CourseCategoryOrmEntity>,
  ) {}
  async getAllCategory(): Promise<any> {
    return 'paovang';
  }

  async createCategory(body: any): Promise<any> {
    const createCatgory = this._courseCategory.create({
      name: body.name,
    });

    return await this._courseCategory.save(createCatgory);
  }
}
