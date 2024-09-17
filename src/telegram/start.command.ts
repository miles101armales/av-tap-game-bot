import { Command } from './classes/command.class';

export class StartCommand extends Command {
  handle(): void {
    this.client.start((ctx) => {
      ctx.sendMessage('Добро пожаловать!', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Запустить приложение',
                web_app: {
                  url: 'https://finance-av.ru/auth',
                },
              },
            ],
          ],
        },
      });
    });
  }
}
