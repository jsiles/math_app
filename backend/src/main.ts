import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SessionMiddleware } from './common/session.middleware';
import { RolesGuard } from './common/roles.guard';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

async function bootstrap() {
  // Verificar si la BD existe, si no crearla y poblarla con admin
  const dbPath = path.join(process.cwd(), 'problems.db');
  const dbExists = fs.existsSync(dbPath);

  const app = await NestFactory.create(AppModule);

  // Endpoint /health para verificar disponibilidad
  app.getHttpAdapter().get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // Configurar CORS para permitir peticiones desde cualquier origen
  app.enableCors({
    origin: '*', // Cambia '*' por la URL de tu frontend si quieres restringir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Registrar SessionMiddleware solo en rutas privadas
  app.use(/^\/(?!users\/login$|users\/refresh$|users$).*/, new SessionMiddleware().use);

  // Registrar RolesGuard globalmente
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Math Problems API')
    .setDescription('API for math problems for Bolivian secondary education')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Si la BD no existe, crear usuario admin por defecto con contraseña cifrada
  if (!dbExists) {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: dbPath,
      entities: [User],
      synchronize: true,
    });
    await dataSource.initialize();
    const admin = new User();
    admin.identifier = 'admin';
    admin.name = 'Administrator';
    admin.email = 'admin@example.com';
    admin.role = 'admin';
    // Contraseña cifrada con bcrypt
    const hashedPassword = await bcrypt.hash('admin123', 10);
    admin.socialSession = JSON.stringify({ password: hashedPassword });
    await dataSource.getRepository(User).save(admin);
    await dataSource.destroy();
  }

  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  await app.listen(3000);
}
bootstrap().catch((err) => {
  // Loguear error en consola y terminar el proceso con código 1
  console.error('Fatal error during bootstrap:', err);
  process.exit(1);
});
