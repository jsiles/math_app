---
applyTo: '**'
---

## Core Development Practices
- Follow software development best practices
- Use layered architecture pattern
- Use English names for functions, variables, and routes
- Provide brief code explanations
- Use React Navigation for navigation organization (Stack, Drawer, Bottom Tabs)
- Separate theme configuration (colors, global styles)
- Move complex logic from components to hooks or services
- Name screens as LoginScreen.tsx, HomeScreen.tsx for clarity
- Use linter and formatter (ESLint + Prettier) to maintain clean code

## Connectivity & State Management
- Always use ConnectionManager for network operations - never bypass it
- Implement smart online/offline fallback strategies using executeSmartOperation
- Maintain connection state prediction and caching (10-second cache duration)
- Use connectionManager.getConnectionState() with proper options (forceCheck, useCache, fastCheck)
- Preserve offline-first architecture with intelligent online detection
- Never remove or modify existing connection management logic

## Service Layer Architecture
- Keep service functions pure with consistent error handling patterns
- Use axios with timeout configuration from environment variables
- Implement proper TypeScript interfaces for all service responses
- Maintain existing service structure: authService, questionService, etc.
- Preserve smart operation patterns: online-first with local fallback
- Always return {success: boolean, message?: string, data?: any} format

## Database Operations
- Use expo-sqlite v15.2.14 with runAsync/getAllAsync patterns
- Maintain parameterized queries for security
- Preserve existing database schema and initialization logic
- Keep comprehensive logging for database operations
- Never modify the simple hash implementation - it's working correctly
- Maintain localdb.ts module exports structure

## Authentication & Security
- Enforce online-only user registration to guarantee server synchronization
- Use simple hash function (not bcrypt) for password hashing - this is intentional
- Maintain AsyncStorage for session token management
- Preserve existing login flow with online/offline fallback
- Keep connection verification before registration attempts
- Never remove connectivity checks from registration flow

## User Experience Patterns
- Display real-time connectivity indicators (🟢 Online / 🔴 Offline / ⚪ Checking)
- Show loading states with ActivityIndicator during async operations
- Provide specific error messages instead of generic ones
- Disable action buttons when offline for operations requiring connectivity
- Use Alert.alert for important user notifications
- Maintain 5-second automatic connection checking in critical screens

## Error Handling & Logging
- Use comprehensive console.log with emojis for easy debugging
- Implement try-catch blocks with specific error messages
- Show user-friendly error messages in Spanish for UI
- Log technical details in English for debugging
- Preserve existing error handling patterns in services
- Never remove debugging logs - they're essential for troubleshooting

## Performance & Optimization
- Maintain cache strategies (10-second connection state cache)
- Use intelligent prediction based on connection history
- Implement fast checks (800ms timeout) vs normal checks (2000ms)
- Preserve smart fallback mechanisms
- Keep automatic reconnection attempts (max 2 with 200ms delay)
- Never modify timeout configurations without understanding impact

## Code Organization
- Maintain src/ structure: components/, screens/, services/, utils/
- Keep screen components in src/screens/ with Screen suffix
- Preserve existing utility modules: connectionManager, localdb, config
- Use TypeScript interfaces and enums consistently
- Keep environment variables in .env file
- Preserve existing component hierarchy and imports

## Critical Preservation Rules
- NEVER modify ConnectionManager core logic - it's finely tuned
- NEVER change database initialization patterns - they're working
- NEVER remove offline capabilities - they're essential features
- NEVER bypass connection checks in registration - security requirement
- NEVER modify the simple hash implementation - bcrypt doesn't work with Expo Go
- NEVER remove connection state caching - it optimizes performance
- NEVER change service response patterns - they're standardized
- NEVER remove automatic connection monitoring - it's user-critical