import { Injectable } from '@nestjs/common';
import { CreateStudentDto, Student, UpdateStudentDto } from '@academy/interfaces';

@Injectable()
export class StudentsService {
  findAll(students: Student[]): Student[] {
    return students;
  }

  findOne(students: Student[], id: string): Student {
    const student = students.find((item) => item.id === id);
    if (!student) {
      throw new Error(`Student ${id} was not found`);
    }
    return student;
  }

  create(students: Student[], dto: CreateStudentDto): Student {
    const student: Student = {
      id: `stu_${String(students.length + 1).padStart(3, '0')}`,
      ...dto,
      status: dto.status ?? 'active',
      enrolledAt: new Date().toISOString(),
    };
    students.push(student);
    return student;
  }

  update(students: Student[], id: string, dto: UpdateStudentDto): Student {
    const index = students.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new Error(`Student ${id} was not found`);
    }
    const current = students[index];
    if (!current) {
      throw new Error(`Student ${id} was not found`);
    }
    const updated = { ...current, ...dto };
    students[index] = updated;
    return updated;
  }

  remove(students: Student[], id: string): void {
    const index = students.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new Error(`Student ${id} was not found`);
    }
    students.splice(index, 1);
  }
}
