import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body('username') username: string) {
    return this.usersService.create({ username, score: 0 });
  }

  @Post(':id/score')
  update(@Param('id') id: number, @Body('score') score: number) {
    return this.usersService.updateScore(+id, score);
  }

  @Get('leaderboard')
  leaderboard() {
    return this.usersService.getLeaderboard();
  }
}
