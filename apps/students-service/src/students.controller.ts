import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student, CreateStudentDto, UpdateStudentDto } from '@academy/interfaces';
import { students } from './data';

@Controller('students')
export class StudentsController {
  private readonly students: Student[] = students;

  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(): Student[] {
    return this.studentsService.findAll(this.students);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'students-service', timestamp: new Date().toISOString() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Student {
    return this.studentsService.findOne(this.students, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateStudentDto): Student {
    return this.studentsService.create(this.students, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto): Student {
    return this.studentsService.update(this.students, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.studentsService.remove(this.students, id);
  }
}
