import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() data: any) {
    return this.usersService.create(data.data);
  }

  @Post(':id/score')
  update(@Param('id') id: number, @Body('score') score: number) {
    return this.usersService.updateScore(+id, score);
  }

  @Get(':id/score')
  getScore(@Param('id') id: number) {
    return this.usersService.getScore(id)
  }

  @Get('leaderboard')
  leaderboard() {
    return this.usersService.getLeaderboard();
  }
}
