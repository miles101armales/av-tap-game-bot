import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webapp-data')
  handleWebAppData(@Body() data: any) {
    console.log('Полученные данные из Web App:', data);
    // Обработка данных
    return { success: true };
  }
}
