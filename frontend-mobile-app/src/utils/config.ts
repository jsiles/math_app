export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000';
export const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '3000'); // 3 segundos por defecto
export const CONNECTION_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_CONNECTION_TIMEOUT || '3000'); // 3 segundos por defecto
