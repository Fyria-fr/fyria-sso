import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  const appUrlEnv = configService.get<string>('APP_URL');

  if (!appUrlEnv) {
    throw new Error('APP_URL is required to allow CORS');
  }

  const allowedOrigins = appUrlEnv.split(',').map((url) => url.trim());

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  const port = parseInt(configService.get('PORT') ?? '3001', 10);
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}
void bootstrap();
