import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users-repository';
import { ClientKafka } from '@nestjs/microservices';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly producerService: ProducerService,
  ) {}

  async create(data: CreateUserDto): Promise<Partial<User>> {
    try {
      const user: User = await this.usersRepo.create(data);

      await this.producerService.produce({
        topic: 'user',
        messages: [
          {
            value: JSON.stringify({
              email: user.email,
            }),
          },
        ],
      });

      return {
        email: user.email,
      };
      
    } catch (error) {}
  }
}
