import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors'; // Importa el módulo CORS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configura CORS
  app.use(cors());

  // Resto de la configuración del servidor...

  await app.listen(3000);
}
bootstrap();
