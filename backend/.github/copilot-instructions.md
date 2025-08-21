# Copilot Instructions for Backend Math API

## Overview
This is a NestJS-based API for math problems, user management, and tasks, designed for Bolivian secondary education. The codebase is organized by domain (problems, users, tasks) and uses TypeORM for persistence.

## Architecture & Patterns
- **Modules:** Each domain (problems, users, tasks) is a NestJS module under `src/`, with its own controller, service, and (if needed) entity.
- **Entities:** TypeORM entities are used for persistence, e.g., `User` in `src/users/user.entity.ts`.
- **Middleware & Guards:**
  - `SessionMiddleware` (`src/common/session.middleware.ts`) is applied to all routes except `/users/login`, `/users/refresh`, and `/users` for JWT authentication.
  - `RolesGuard` (`src/common/roles.guard.ts`) is registered globally for role-based access control.
- **Swagger:** API documentation is auto-generated and available at `/api`.
- **Database:** SQLite file `problems.db` is auto-created and seeded with an admin user if missing.

## Developer Workflows
- **Install:** `npm install`
- **Run (dev):** `npm run start:dev`
- **Build:** `npm run build`
- **Test:** `npm run test` (uses Jest + ts-jest, config in `jest.config.js`)
- **Test conventions:** Unit tests are in `*.spec.ts` files, e.g., `src/users/users.controller.spec.ts`.
- **TypeScript:** All source and test files use TypeScript.

## Project-Specific Conventions
- **User Authentication:**
  - JWT tokens are required for all routes except login/refresh/user creation.
  - Passwords are hashed with bcrypt and stored in the `socialSession` field as JSON.
- **Error Handling:**
  - Controllers throw `NotFoundException` or `UnauthorizedException` for missing/invalid resources.
- **Seeding:**
  - On first run, an admin user is created with identifier `admin` and password `admin123`.
- **Testing:**
  - Use Jest and ts-jest. See `jest.config.js` for up-to-date config (transform for ts-jest, no deprecated globals).

## Integration Points
- **External:**
  - TypeORM (SQLite)
  - bcryptjs (password hashing)
  - jsonwebtoken (JWT)
  - Swagger (API docs)

## Examples
- To add a new protected route, ensure it is not excluded in the SessionMiddleware regex and use role guards as needed.
- To seed new entities, update the bootstrap logic in `src/main.ts`.
- To add a new module, follow the structure in `src/problems/algebra` or `src/users`.

## Key Files & Directories
- `src/main.ts`: App bootstrap, middleware, guards, Swagger, DB seeding
- `src/common/`: Shared middleware and guards
- `src/users/`: User entity, controller, service, and tests
- `jest.config.js`: Jest/ts-jest config
- `README.md`: Project overview and usage

---
If any conventions or workflows are unclear, ask the user for clarification or examples from their recent commits.
