import { Body, Controller, Get, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webapp-data')
  handleWebAppData(@Body() data: any) {
    // Обработка данных
    return { success: true };
  }

  @Get()
  handleServer() {
    return 'OK'
  } 
}
