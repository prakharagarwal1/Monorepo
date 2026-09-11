export interface Course {
  id: string;
  title: string;
  description: string;
  credits: number;
  teacherId?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  department?: string;
}

export interface CreateCourseDto {
  title: string;
  description: string;
  credits: number;
  teacherId?: string;
  status?: Course['status'];
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  credits?: number;
  teacherId?: string;
  status?: Course['status'];
}