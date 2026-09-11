import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto, Teacher, UpdateTeacherDto } from '@academy/interfaces';

@Injectable()
export class TeachersService {
  findAll(teachers: Teacher[]): Teacher[] {
    return teachers;
  }

  findOne(teachers: Teacher[], id: string): Teacher {
    const teacher = teachers.find((item) => item.id === id);
    if (!teacher) {
      throw new NotFoundException(`Teacher ${id} was not found`);
    }
    return teacher;
  }

  create(teachers: Teacher[], dto: CreateTeacherDto): Teacher {
    const teacher: Teacher = {
      id: `tea_${String(teachers.length + 1).padStart(3, '0')}`,
      ...dto,
      specialties: dto.specialties ?? [],
      status: dto.status ?? 'active',
    };
    teachers.push(teacher);
    return teacher;
  }

  update(teachers: Teacher[], id: string, dto: UpdateTeacherDto): Teacher {
    const index = teachers.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Teacher ${id} was not found`);
    }
    const current = teachers[index];
    if (!current) {
      throw new NotFoundException(`Teacher ${id} was not found`);
    }
    const updated = { ...current, ...dto };
    teachers[index] = updated;
    return updated;
  }

  remove(teachers: Teacher[], id: string): void {
    const index = teachers.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Teacher ${id} was not found`);
    }
    teachers.splice(index, 1);
  }
}
