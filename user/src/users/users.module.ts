import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/implements/prisma-users-repository';
import { PrismaService } from 'src/database/prsima.service';
import { UsersService } from './users.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [PrismaModule, KafkaModule],
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
