export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialties: string[];
  status: 'active' | 'inactive';
}

export interface CreateTeacherDto {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialties?: string[];
  status?: Teacher['status'];
}

export interface UpdateTeacherDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  specialties?: string[];
  status?: Teacher['status'];
}