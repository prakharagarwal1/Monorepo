import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto, Enrollment, UpdateEnrollmentDto } from '@academy/interfaces';

@Injectable()
export class EnrollmentsService {
  findAll(enrollments: Enrollment[]): Enrollment[] {
    return enrollments;
  }

  findOne(enrollments: Enrollment[], id: string): Enrollment {
    const enrollment = enrollments.find((item) => item.id === id);
    if (!enrollment) {
      throw new NotFoundException(`Enrollment ${id} was not found`);
    }
    return enrollment;
  }

  create(enrollments: Enrollment[], dto: CreateEnrollmentDto): Enrollment {
    const enrollment: Enrollment = {
      id: `enr_${String(enrollments.length + 1).padStart(3, '0')}`,
      ...dto,
      status: dto.status ?? 'pending',
      enrolledAt: new Date().toISOString(),
    };
    enrollments.push(enrollment);
    return enrollment;
  }

  update(enrollments: Enrollment[], id: string, dto: UpdateEnrollmentDto): Enrollment {
    const index = enrollments.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Enrollment ${id} was not found`);
    }
    const current = enrollments[index];
    if (!current) {
      throw new NotFoundException(`Enrollment ${id} was not found`);
    }
    const updated = { ...current, ...dto };
    enrollments[index] = updated;
    return updated;
  }

  remove(enrollments: Enrollment[], id: string): void {
    const index = enrollments.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`Enrollment ${id} was not found`);
    }
    enrollments.splice(index, 1);
  }
}
