// Connection states
export enum ConnectionState {
  UNKNOWN = 'unknown',
  ONLINE = 'online',
  OFFLINE = 'offline'
}

// User types
export interface User {
  identifier: string;
  name: string;
  role: 'student' | 'teacher';
  password?: string;
  online_enabled?: number;
}

// Question types
export interface Question {
  id: number;
  question: string;
  topic: 'algebra' | 'geometry' | 'trigonometry' | 'statistics';
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: 'online' | 'offline';
}

// Service response types
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  source?: 'online' | 'offline';
}

// Authentication types
export interface LoginResponse extends ServiceResponse {
  token?: string;
  user?: Omit<User, 'password'>;
  source: 'online' | 'offline';
}

export interface RegisterResponse extends ServiceResponse {
  source: 'online';
}

// Connection manager types
export interface ConnectionOptions {
  forceCheck?: boolean;
  useCache?: boolean;
  fastCheck?: boolean;
}

export interface ConnectionStats {
  total: number;
  online: number;
  offline: number;
  onlinePercentage: number;
  lastKnownState: ConnectionState;
  predictedNextState: ConnectionState;
}

// Database types
export interface DatabaseConfig {
  name: string;
  version: number;
  tables: {
    users: string;
    problems: string;
  };
}

// Component props types
export interface ConnectionIndicatorProps {
  state: ConnectionState;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface ScreenBaseProps {
  navigation?: any;
  route?: any;
}
