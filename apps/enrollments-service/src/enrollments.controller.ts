import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment, CreateEnrollmentDto, UpdateEnrollmentDto } from '@academy/interfaces';
import { enrollments } from './data';

@Controller('enrollments')
export class EnrollmentsController {
  private readonly enrollments: Enrollment[] = enrollments;

  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  findAll(): Enrollment[] {
    return this.enrollmentsService.findAll(this.enrollments);
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'enrollments-service', timestamp: new Date().toISOString() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Enrollment {
    return this.enrollmentsService.findOne(this.enrollments, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEnrollmentDto): Enrollment {
    return this.enrollmentsService.create(this.enrollments, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto): Enrollment {
    return this.enrollmentsService.update(this.enrollments, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.enrollmentsService.remove(this.enrollments, id);
  }
}
