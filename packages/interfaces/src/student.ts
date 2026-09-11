export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrolledAt: string;
  status: 'active' | 'inactive';
}

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  status?: Student['status'];
}

export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: Student['status'];
}