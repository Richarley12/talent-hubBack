import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors({
    origin:"*"
   })

  // Configuración básica de Swagger
  const config = new DocumentBuilder()
    .setTitle('API del servidor')
    .setDescription('Documentación de los endpoints del talent-hub')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // La interfaz estará en /api-docs
  await app.listen(envs.port ?? 3001);
  console.log(`Server corriendo en puerto ${envs.port}`)


}
bootstrap();
