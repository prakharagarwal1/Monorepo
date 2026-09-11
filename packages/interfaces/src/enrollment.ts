export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'pending' | 'confirmed' | 'completed' | 'dropped' | 'cancelled';
}

export interface CreateEnrollmentDto {
  studentId: string;
  courseId: string;
  status?: Enrollment['status'];
}

export interface UpdateEnrollmentDto {
  studentId?: string;
  courseId?: string;
  status?: Enrollment['status'];
}