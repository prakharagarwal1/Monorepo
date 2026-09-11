import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course, CreateCourseDto, UpdateCourseDto } from '@academy/interfaces';
import { courses } from './data';

@Controller('courses')
export class CoursesController {
  private readonly courses: Course[] = courses;

  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Course[] {
    return this.coursesService.findAll(this.courses);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'courses-service', timestamp: new Date().toISOString() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Course {
    return this.coursesService.findOne(this.courses, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCourseDto): Course {
    return this.coursesService.create(this.courses, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto): Course {
    return this.coursesService.update(this.courses, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.coursesService.remove(this.courses, id);
  }
}
