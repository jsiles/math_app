// Authentication screens
export { default as LoginScreen } from './LoginScreen';
export { default as RegisterScreen } from './RegisterScreen';

// Main application screens
export { default as QuestionScreen } from './QuestionScreen';
export { default as MainCategoriesScreen } from './MainCategoriesScreen';

// Subject-specific screens
export { default as AlgebraScreen } from './AlgebraScreen';
export { default as GeometryScreen } from './GeometryScreen';
export { default as StatisticsScreen } from './StatisticsScreen';
export { default as TrigonometryScreen } from './TrigonometryScreen';

// User management screens
export { default as UserScreen } from './UserScreen';

// Screen types
export interface ScreenProps {
  navigation?: any;
  route?: any;
}

export interface ConnectionAwareScreenProps extends ScreenProps {
  connectionState?: 'online' | 'offline' | 'unknown';
}
