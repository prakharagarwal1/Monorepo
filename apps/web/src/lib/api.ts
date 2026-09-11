import axios from 'axios';

const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "http://127.0.0.1:3001";

// Create an axios instance
const api = axios.create({
  baseURL: gatewayUrl,
});

// Request interceptor to add headers or handle CORS
api.interceptors.request.use(
  (config) => {
    // You can modify the config here, e.g., add auth token
    // For CORS, we rely on the browser and the server (API gateway) to handle it.
    // If you need to set credentials, you can do:
    // config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can handle errors here, e.g., log to analytics
    // For now, we just reject the error
    return Promise.reject(error);
  }
);

export const fetchStudents = async () => {
  try {
    const response = await api.get('/api/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const fetchTeachers = async () => {
  try {
    const response = await api.get('/api/teachers');
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

export const fetchCourses = async () => {
  try {
    const response = await api.get('/api/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const fetchEnrollments = async () => {
  try {
    const response = await api.get('/api/enrollments');
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }
};

export const fetchNotifications = async () => {
  try {
    const response = await api.get('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const fetchHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Error fetching health:', error);
    return { status: 'error' };
  }
};
