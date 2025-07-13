import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}
  @Get('categories')
  async getAllCategory(): Promise<any> {
    return await this._courseService.getAllCategory();
  }

  @Post('create-category')
  async createCategory(@Body() body: any): Promise<any> {
    return await this._courseService.createCategory(body);
  }
}
