---
applyTo: '**'
---
- Considerar una arquitectura de microservicios para la aplicación.
- Utilizar un diseño centrado en el usuario para garantizar una experiencia de usuario óptima.
- Implementar un sistema de autenticación y autorización para proteger los recursos de la aplicación.
- Considerar documentar el código y la arquitectura de la aplicación para facilitar el mantenimiento y la colaboración.
- Los mensajes al usuario deben ser claros y concisos, evitando tecnicismos innecesarios.
- Los mensajes deben ser parametrizables en una base de datos para facilitar la localización y personalización.
- La aplicación debe ser multiidioma, permitiendo a los usuarios seleccionar su idioma preferido.
- Considerar un diseño minimilasta y modular para facilitar el mantenimiento y la escalabilidad.
- Utilizar un framework de desarrollo móvil multiplataforma como React Native (aplciación móvil) y React (aplicación web) para el frontend y Node.js para el backend.
- Implementar una API RESTful para la comunicación entre el frontend y el backend.
- Utilizar un enfoque de desarrollo basado en pruebas (TDD) para asegurar la calidad del código.
- Implementar un sistema de gestión de configuración para facilitar el despliegue y la escalabilidad
- Utilizar contenedores (como Docker) para facilitar la portabilidad y el despliegue de la aplicación.
- Implementar un sistema de monitoreo y logging para detectar y solucionar problemas en producción.
- Asegurar que la aplicación sea segura, implementando prácticas de seguridad recomendadas.
- Documentar la API de la aplicación utilizando OpenAPI o Swagger.
- Utilizar un sistema de control de versiones (como Git) para gestionar el código fuente.
- Implementar un sistema de integración continua (CI) y entrega continua (CD) para automatizar el proceso de despliegue.
- Considerar el uso de bases de datos NoSQL si la aplicación requiere alta escalabilidad y flexibilidad en el esquema de datos.
- Implementar un sistema de autenticación y autorización robusto para proteger los recursos de la aplicación.
- Utilizar herramientas de análisis estático de código para mejorar la calidad del código y detectar errores
  antes de que lleguen a producción.        
- Considerar buenas prácticas de diseño de API, como la versión de la API y el manejo de errores.
- Implementar un sistema de caché para mejorar el rendimiento de la aplicación.
- Utilizar un enfoque de desarrollo ágil para adaptarse rápidamente a los cambios en los requisitos.
- Asegurar que la aplicación sea accesible y cumpla con las pautas de accesibilidad web.
- Implementar pruebas de carga y rendimiento para asegurar que la aplicación pueda manejar el tráfico esperado.
- Considerar el uso de servicios en la nube para el despliegue y la escalabilidad de la aplicación.
- Implementar un sistema de gestión de usuarios y roles para controlar el acceso a diferentes funcionalidades de la aplicación.
- Utilizar herramientas de análisis de datos para obtener información sobre el uso de la aplicación y mejorar la experiencia del usuario.
- Implementar un sistema de gestión de errores para capturar y manejar excepciones de manera efectiva
- Considerar la implementación de un sistema de traducción para soportar múltiples idiomas.
- Considerar una Base de datos sqllite para modo offline y una base de datos en la nube para el modo online.
- Implementar un sistema de backup y recuperación de datos para proteger la información del usuario.
Elaborar una aplicación móvil que sea un asistente virtual para resolver problemas de matemáticas, geometría trigonometría y álgebra, utilizando inteligencia artificial para proporcionar soluciones paso a paso. La aplicación debe ser capaz de:
- Reconocer problemas matemáticos escritos a mano o impresos.
- Proporcionar soluciones detalladas y explicaciones paso a paso.
- Permitir a los usuarios interactuar con la aplicación mediante voz y texto.
- Ofrecer una interfaz de usuario intuitiva y fácil de usar.
- Incluir un sistema de retroalimentación para mejorar las respuestas basadas en la interacción del usuario.
- Implementar un sistema de aprendizaje automático para mejorar continuamente la precisión de las soluciones.
- Considerar la integración con plataformas de aprendizaje en línea para proporcionar recursos adicionales.
- Asegurar que la aplicación sea compatible con múltiples plataformas (iOS, Android).
- Implementar un sistema de notificaciones para recordar a los usuarios sobre tareas pendientes o nuevos problemas.
- Incluir un modo de práctica para que los usuarios puedan resolver problemas por sí mismos y recibir retroalimentación.
- Implementar un sistema de gamificación para motivar a los usuarios a aprender y resolver problemas.
- Considerar la posibilidad de incluir un modo offline para que los usuarios puedan acceder a las funcionalidades
  básicas sin conexión a internet.  
- Implementar un sistema de análisis de rendimiento para que los usuarios puedan ver su progreso y áreas de mejora.
- Asegurar que la aplicación sea escalable y pueda manejar un gran número de usuarios simultáneamente.
- Implementar un sistema de soporte al usuario para resolver dudas y problemas técnicos.
- Considerar modos online y offline para la aplicación, donde el modo online permite el acceso a recursos adicionales y actualizaciones en tiempo real, mientras que el modo offline permite a los usuarios resolver problemas sin conexión a internet. Además, considerar la implementación de una base de datos local para almacenar los problemas y soluciones en modo offline, y una base de datos en la nube para sincronizar los datos cuando la conexión esté disponible.
- Considerar los roles estudiantes y profesores, donde los estudiantes pueden resolver problemas y recibir retroalimentación, y los profesores pueden asignar tareas y monitorear el progreso de los estudiantes.
- Implementar un sistema de notificaciones para alertar a los usuarios sobre nuevas tareas, recordatorios de estudio y actualizaciones importantes.
- Considerar la implementación de un sistema de recompensas para motivar a los usuarios a completar tareas y mejorar su rendimiento.
- Implementar un sistema de análisis de datos para obtener información sobre el uso de la aplicación y mejorar la experiencia del usuario.
- Incorporar encuestas de satisfacción para obtener retroalimentación de los usuarios y mejorar la aplicación.
- Implementar un sistema de gestión de contenido para que los profesores puedan crear y compartir recursos educativos.
- Considerar la implementación de un sistema de chat en vivo para que los usuarios puedan interactuar con expertos en matemáticas y recibir ayuda en tiempo real.
- Implementar un sistema de autenticación y autorización para garantizar la seguridad de los datos del usuario
- Posibilidad de contextualizar la aplicación a alumnos de secudaría del sistema educativo boliviano, contextualizar problemas a la región y al contexto cultural de los estudiantes.
- Implementar un sistema de análisis de errores comunes para identificar áreas donde los estudiantes suelen tener dificultades y proporcionar recursos específicos para mejorar en esas áreas.
- Considerar la implementación de un sistema de tutoría en línea, donde los estudiantes puedan conectarse con tutores para recibir ayuda personalizada en tiempo real.
- Implementar un sistema de gestión de tareas y seguimiento del progreso para que los estudiantes puedan organizar
  sus estudios y los profesores puedan monitorear el avance de sus alumnos.

# Recommended Project Structure

## Backend (NestJS)

```
backend/
  ├── src/
  │     ├── app.module.ts
  │     ├── main.ts
  │     ├── problems/
  │     │     ├── algebra/
  │     │     ├── trigonometry/
  │     │     ├── geometry/
  │     │     └── statistics/
  │     ├── users/
  │     ├── tasks/
  │     └── ...
  ├── test/
  ├── package.json
  ├── tsconfig.json
  └── README.md
```
- Modular structure by domain (problems, users, tasks, etc.)
- Use controllers, services, and DTOs per module
- API documentation with Swagger
- Configuration in `.env` files
- Unit tests in the `test/` folder

## Frontend Web (React)

```
frontend-web/
  ├── src/
  │     ├── components/
  │     ├── pages/
  │     ├── services/ (API calls)
  │     ├── utils/
  │     └── ...
  ├── public/
  ├── package.json
  ├── tsconfig.json
  └── README.md
```
- Reusable components and pages by feature
- Services for backend communication
- Use hooks and context for state management

## Mobile Frontend (React Native)

```
frontend-mobile/
  ├── src/
  │     ├── components/
  │     ├── screens/
  │     ├── services/ (API calls)
  │     ├── utils/
  │     └── ...
  ├── assets/
  ├── app.json
  ├── package.json
  └── README.md
```
- Screens for main flows (solve problems, practice, profile, etc.)
- Reusable components
- Services for backend communication
- Integration with notifications and local storage

## General
- Use English names for entities, folders, files, and routes
- Keep documentation updated in each module's README
- Update this file if new conventions or integrations are added
