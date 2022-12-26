import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

// validations
import { ValidationPipe } from '@nestjs/common';
const { PORT } = process.env;

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/crt.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT || 3333);
}
bootstrap();
