import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const player = this.userRepository.create(createUserDto);
    return this.userRepository.save(player);
  }

  async updateScore(_id: number, score: number): Promise<User> {
    const player = await this.userRepository.findOne({ where: { _id } });
    player.score += score;
    return this.userRepository.save(player);
  }

  async getLeaderboard(): Promise<User[]> {
    return await this.userRepository.find({
      order: { score: 'DESC' },
      take: 10,
    });
  }
}
