import { useQuery } from "@tanstack/react-query";
import { createApiWithInterceptors } from "@academy/axios-interceptors";
import { API_GATEWAY_URL } from "@academy/constants";
import { Student, Teacher, Course, Enrollment, Notification } from "@academy/interfaces";

const api = createApiWithInterceptors(API_GATEWAY_URL);

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await api.get<Student[]>("/students");
      return response.data ?? [];
    },
  });
}

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const response = await api.get<Teacher[]>("/teachers");
      return response.data ?? [];
    },
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get<Course[]>("/courses");
      return response.data ?? [];
    },
  });
}

export function useEnrollments() {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const response = await api.get<Enrollment[]>("/enrollments");
      return response.data ?? [];
    },
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get<Notification[]>("/notifications");
      return response.data ?? [];
    },
  });
}

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await api.get<{ status: string }>("/health");
      return response.data ?? { status: "error" };
    },
  });
}
