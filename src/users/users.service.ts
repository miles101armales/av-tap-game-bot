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
    const existingPlayer = await this.userRepository.findOne({where: { id: createUserDto.id}})
    if (existingPlayer) {
      await this.userRepository.update({id: createUserDto.id}, createUserDto)
      return existingPlayer;
    } else {
      const player = this.userRepository.create(createUserDto);
      
      return await this.userRepository.save(player);
    }
  }

  async updateScore(id: number, score: number): Promise<User> {
    const player = await this.userRepository.findOne({ where: { id } });
    player.score = score;
    return this.userRepository.save(player);
  }

  async getScore(id: number): Promise<{}> {
    const player = await this.userRepository.findOne({ where: { id } });
    return { score: player.score};
  }

  async getLeaderboard(): Promise<User[]> {
    return await this.userRepository.find({
      order: { score: 'DESC' },
      take: 10,
    });
  }
}
