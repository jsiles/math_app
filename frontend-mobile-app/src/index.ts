// Main application exports

// Screens
export * from './screens';

// Services  
export * from './services';

// Utils
export * from './utils';

// Types (explicit exports to avoid conflicts)
export { ConnectionState } from './types';
export type {
    ConnectionIndicatorProps, ConnectionOptions,
    ConnectionStats,
    DatabaseConfig, LoginResponse, Question, RegisterResponse, ScreenBaseProps, User
} from './types';

// Constants
export * from './constants';

// Re-export commonly used items for convenience
export { APP_NAME, CONNECTION_CONFIG, UI_CONFIG } from './constants';
export { LoginScreen, QuestionScreen, RegisterScreen } from './screens';
export { connectionManager } from './utils/connectionManager';

