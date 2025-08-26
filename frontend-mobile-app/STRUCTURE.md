# 📂 PROJECT STRUCTURE DOCUMENTATION

## 🏗️ **Architecture Overview**

This project follows a **layered architecture** with clear separation of concerns:

```
src/
├── components/        # Reusable UI components
├── screens/          # Screen components (with index.ts for exports)
├── services/         # Business logic and API calls (with index.ts for exports)
├── utils/            # Utility functions and helpers (with index.ts for exports)
├── types/            # TypeScript type definitions
├── constants/        # Application constants and configuration
└── index.ts          # Main export file for the entire src folder

app/                  # Expo Router navigation files
├── _layout.tsx       # Root layout
├── (tabs)/          # Tab navigation routes
├── login.tsx        # Re-exports LoginScreen
├── register.tsx     # Re-exports RegisterScreen
├── question.tsx     # Re-exports QuestionScreen
└── home.tsx         # Home screen implementation
```

## 📋 **File Organization Principles**

### 1. **Import Organization**
All imports are organized in the following order:
```typescript
// 1. React and React Native imports
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

// 2. Third-party libraries
import { useRouter } from 'expo-router';

// 3. Services imports
import { login } from '../services/authService';

// 4. Utils imports
import { connectionManager } from '../utils/connectionManager';

// 5. Types imports
import type { User, ConnectionState } from '../types';

// 6. Constants imports
import { UI_CONFIG, ERROR_MESSAGES } from '../constants';
```

### 2. **Index Files**
Each major folder has an `index.ts` file that:
- Exports all public APIs from that folder
- Provides a clean import interface
- Prevents deep import paths
- Enables tree-shaking

### 3. **Type Definitions**
- All types are centralized in `src/types/index.ts`
- Interfaces are preferred over types for extensibility
- Enums are used for constants with finite values
- Generic types are used for reusable patterns

### 4. **Constants Organization**
- All constants are centralized in `src/constants/index.ts`
- Constants are grouped by functionality
- `as const` assertions for type safety
- Descriptive naming with SCREAMING_SNAKE_CASE

## 🔧 **Module Exports Strategy**

### **Services Module (`src/services/index.ts`)**
```typescript
// Individual service exports
export * from './authService';
export * from './questionService';
// ... other services

// Common types for services
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}
```

### **Utils Module (`src/utils/index.ts`)**
```typescript
// Utility function exports
export * from './auth';
export * from './localdb';
export * from './connectionManager';

// Default exports for classes/objects
export { default as DatabaseHelper } from './dbHelper';
```

### **Screens Module (`src/screens/index.ts`)**
```typescript
// Screen component exports
export { default as LoginScreen } from './LoginScreen';
export { default as RegisterScreen } from './RegisterScreen';
// ... other screens

// Common screen types
export interface ScreenProps {
  navigation?: any;
  route?: any;
}
```

## 🎯 **Import Patterns**

### **Recommended Imports**
```typescript
// ✅ Good: Use index files for clean imports
import { LoginScreen, RegisterScreen } from '../screens';
import { authService, questionService } from '../services';
import { connectionManager, ConnectionState } from '../utils';

// ✅ Good: Group related imports
import { 
  APP_NAME, 
  UI_CONFIG, 
  ERROR_MESSAGES 
} from '../constants';
```

### **Avoid These Patterns**
```typescript
// ❌ Bad: Deep imports
import LoginScreen from '../screens/LoginScreen';
import { login } from '../services/authService';

// ❌ Bad: Mixed import styles
import LoginScreen from '../screens/LoginScreen';
import { RegisterScreen } from '../screens';
```

## 📱 **Expo Router Integration**

The `app/` folder contains route files that re-export screens:

```typescript
// app/login.tsx
/**
 * Login route for expo-router
 * Re-exports LoginScreen from src/screens
 */
import { LoginScreen } from '../src/screens';
export default LoginScreen;
```

This pattern:
- Keeps navigation logic separate from business logic
- Maintains clean screen imports
- Enables easy route configuration
- Preserves screen reusability

## 🔍 **Type Safety Strategy**

### **Explicit Type Exports**
```typescript
// Avoid namespace conflicts with explicit exports
export type { 
  User, 
  Question, 
  LoginResponse 
} from './types';

// Export enums directly
export { ConnectionState } from './types';
```

### **Service Type Definitions**
```typescript
// Services define their own response types
interface LoginResponse extends ServiceResponse {
  token?: string;
  user?: User;
  source: 'online' | 'offline';
}

// Functions have explicit return types
export async function login(
  identifier: string, 
  password: string
): Promise<LoginResponse> {
  // implementation
}
```

## 🛡️ **Best Practices**

### 1. **Consistent Naming**
- Screen files: `PascalCase` + `Screen` suffix
- Service files: `camelCase` + `Service` suffix  
- Util files: `camelCase` descriptive names
- Constants: `SCREAMING_SNAKE_CASE`

### 2. **Export Strategy**
- Named exports for functions and classes
- Default exports for React components
- Type-only exports for TypeScript types
- Re-exports through index files

### 3. **Import Organization**
- External dependencies first
- Internal modules grouped by type
- Relative imports use explicit paths
- No circular dependencies

### 4. **Documentation**
- JSDoc comments for public APIs
- README files for complex modules
- Inline comments for business logic
- Type annotations for clarity

## 🎉 **Benefits of This Structure**

1. **🔍 Discoverability**: Clear module boundaries make code easy to find
2. **🔧 Maintainability**: Logical grouping simplifies maintenance
3. **📦 Reusability**: Clean exports enable easy code reuse
4. **🚀 Scalability**: Structure supports growth without refactoring
5. **🛡️ Type Safety**: Centralized types prevent inconsistencies
6. **📚 Documentation**: Self-documenting through organization
