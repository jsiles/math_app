# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Instala dependencias nativas necesarias para sqlite3
RUN apk add --no-cache python3 make g++ 

# Install dependencies
COPY backend/package.json ./
RUN npm install

# Verifica que sqlite3 se instaló correctamente
RUN node -e "require('sqlite3')"

# Copy backend source code
COPY backend/. ./

# Asegurar permisos de escritura para la base de datos y archivos generados
RUN mkdir -p /app && chmod -R 777 /app

# Build NestJS project
RUN npm run build

# Expose port (Nest default is 3000)
EXPOSE 3000

# Start NestJS app en producción usando el archivo compilado
CMD ["npm", "run", "start:prod"]
