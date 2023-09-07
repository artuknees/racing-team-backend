// main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // para documentacion
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // descarto lo que no sirve de mi payload
      forbidNonWhitelisted: true, // alerta de un error cuando mando algo que no corresponde en el payload
      transformOptions: {
        enableImplicitConversion: true // para transofrmar todos los query params a numero - para hacerlo automatico
      }
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Racing Team API')
    .setDescription('API para manejo de autos y motores de equipo de carreras')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document); // docs es el endpoint de donde sale toda la documentacion
  app.enableCors(); // con esto abro el CORS. Esto habilita todo.
  await app.listen(process.env.PORT || 3000); // que lea la variable de entorno o que use el 3000
}
bootstrap();