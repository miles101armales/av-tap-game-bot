import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const pathToRoot = '/';
  const httpsOptions = {
    key: readFileSync(join(pathToRoot, 'etc', 'letsencrypt', 'live', 'finance-av.ru', 'privkey.pem')),
    cert: readFileSync(join(pathToRoot, 'etc', 'letsencrypt', 'live', 'finance-av.ru', 'fullchain.pem')),
    ca: readFileSync(join('/etc/letsencrypt/live/finance-av.ru', 'chain.pem')),
  };

  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });

  app.enableCors({
    origin: [
      'https://finance-av.ru',      // Ваш основной домен
      'https://web.telegram.org',   // Веб-версия Telegram
      'https://t.me',               // Telegram ссылки
      'https://*.web.telegram.org', // Telegram WebView может использовать поддомены
      'https://webview.telegram.org' // Мобильная версия Telegram WebView
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешаем методы, которые используются в приложении
    credentials: true, // Разрешаем передавать куки и данные аутентификации
    allowedHeaders: ['Content-Type', 'Authorization'], // Заголовки, которые будут разрешены
    exposedHeaders: ['Authorization'], // Заголовки, которые будут видны клиенту
    preflightContinue: false, // Управление preflight-запросами (предварительные запросы типа OPTIONS)
    optionsSuccessStatus: 204, // Статус ответа для preflight-запросов
  });

  // Убедитесь, что используется глобальный префикс API
  app.setGlobalPrefix('game-bot');

  // Подключаем CORS middleware (если нужно)
  app.use(cors());

  await app.listen(3001);
}

bootstrap();