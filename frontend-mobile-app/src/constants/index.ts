// Application constants
export const APP_NAME = 'Math Assistant';
export const APP_VERSION = '1.0.0';

// Connection constants
export const CONNECTION_CONFIG = {
  FAST_TIMEOUT: 800,
  NORMAL_TIMEOUT: 2000,
  CACHE_DURATION: 10000,
  MAX_RETRY_ATTEMPTS: 2,
  STORAGE_KEY: 'connection_state_history',
  AUTO_CHECK_INTERVAL: 5000, // 5 seconds
} as const;

// Database constants
export const DATABASE_CONFIG = {
  NAME: 'mathapp.db',
  VERSION: 1,
  TABLES: {
    USERS: 'users',
    PROBLEMS: 'problems',
  },
} as const;

// UI constants
export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#007AFF',
    SUCCESS: '#34C759',
    WARNING: '#FF9500',
    ERROR: '#FF3B30',
    ONLINE: '#34C759',
    OFFLINE: '#FF3B30',
    UNKNOWN: '#8E8E93',
  },
  ICONS: {
    ONLINE: '🟢',
    OFFLINE: '🔴',
    UNKNOWN: '⚪',
    LOADING: '⚪',
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
} as const;

// Validation constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
} as const;

// Topics constants
export const TOPICS = {
  ALGEBRA: 'algebra',
  GEOMETRY: 'geometry',
  TRIGONOMETRY: 'trigonometry',
  STATISTICS: 'statistics',
} as const;

// User roles constants
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de red. Verifica tu conexión a internet e intenta nuevamente.',
  TIMEOUT_ERROR: 'Tiempo de espera agotado. Verifica tu conexión a internet e intenta nuevamente.',
  CONNECTIVITY_REQUIRED: 'Conexión requerida: Esta operación requiere conexión a internet.',
  INVALID_CREDENTIALS: 'Credenciales inválidas. Verifica tu usuario y contraseña.',
  USER_NOT_FOUND: 'Usuario no encontrado.',
  REGISTRATION_FAILED: 'Error en el registro. Verifica que el usuario no exista ya.',
  UNEXPECTED_ERROR: 'Error inesperado. Intenta nuevamente.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  REGISTRATION_SUCCESS: 'Usuario registrado exitosamente',
  DATA_SYNCED: 'Datos sincronizados correctamente',
  CONNECTION_RESTORED: 'Conexión restaurada',
} as const;
