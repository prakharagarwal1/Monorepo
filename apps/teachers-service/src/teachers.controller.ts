import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher, CreateTeacherDto, UpdateTeacherDto } from '@academy/interfaces';
import { teachers } from './data';

@Controller('teachers')
export class TeachersController {
  private readonly teachers: Teacher[] = teachers;

  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll(): Teacher[] {
    return this.teachersService.findAll(this.teachers);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'teachers-service', timestamp: new Date().toISOString() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Teacher {
    return this.teachersService.findOne(this.teachers, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTeacherDto): Teacher {
    return this.teachersService.create(this.teachers, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeacherDto): Teacher {
    return this.teachersService.update(this.teachers, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.teachersService.remove(this.teachers, id);
  }
}
