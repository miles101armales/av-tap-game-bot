import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Scenes, Telegraf } from 'telegraf';
import { Command } from './classes/command.class';
import { Scene } from './classes/scene.class';
import { MyContext } from './interfaces/context.interface';
import { StartCommand } from './start.command';

@Injectable()
export class TelegramService implements OnApplicationBootstrap {
  public readonly client: Telegraf<MyContext>;
  private commands: Command[] = [];
  private scenes: Scene[] = [];
  private scenesNames: Scenes.WizardScene<MyContext>[] = [];

  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly configService: ConfigService) {
    this.client = new Telegraf<MyContext>(
      this.configService.get('TELEGRAM_API_KEY'),
    );
  }
  onApplicationBootstrap() {
    try {
      this.commands = [new StartCommand(this.client)];
      for (const command of this.commands) {
        command.handle();
      }
      this.client.launch();
      this.logger.log('Telegram Bot initialized');
    } catch (error) {}
  }
}
