import { Injectable, NotFoundException } from '@nestjs/common';
import { Course, CreateCourseDto, UpdateCourseDto } from '@academy/interfaces';

@Injectable()
export class CoursesService {
  findAll(courses: Course[]): Course[] {
    return courses;
  }

  findOne(courses: Course[], id: string): Course {
    const course = courses.find((item) => item.id === id);
    if (!course) {
      throw new NotFoundException(`Course ${id} was not found`);
    }
    return course;
  }

  create(courses: Course[], dto: CreateCourseDto): Course {
    const course: Course = {
      id: `cou_${String(courses.length + 1).padStart(3, '0')}`,
      ...dto,
      status: dto.status ?? 'draft',
      createdAt: new Date().toISOString(),
    };
    courses.push(course);
    return course;
  }

  update(courses: Course[], id: string, dto: UpdateCourseDto): Course {
    const index = courses.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Course ${id} was not found`);
    }
    const current = courses[index];
    if (!current) {
      throw new NotFoundException(`Course ${id} was not found`);
    }
    const updated = { ...current, ...dto };
    courses[index] = updated;
    return updated;
  }

  remove(courses: Course[], id: string): void {
    const index = courses.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Course ${id} was not found`);
    }
    courses.splice(index, 1);
  }
}
