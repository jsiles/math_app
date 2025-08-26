// Authentication services
export * from './authService';

// Question services
export * from './geometryService';
export * from './questionService';
export * from './statisticsService';
export * from './trigonometryService';

// User services
export * from './userService';

// Service types
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  source?: 'online' | 'offline';
}

export interface QuestionData {
  id: number;
  question: string;
  topic: string;
  difficulty?: string;
  source?: 'online' | 'offline';
}

export interface UserData {
  identifier: string;
  name: string;
  role: string;
  source?: 'online' | 'offline';
}
