import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prsima.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }
}
