import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prsima.service';
import { PrismaModule } from './database/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/Consumer.service';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PrismaModule, KafkaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly consumer: ConsumerService) {}

  async onModuleInit() {
    await this.consumer.consume(
      { topics: ['user'] },
      {
        eachMessage: async ({ message, topic }) => {
          console.log('passou')
          console.log({
            topic: topic.toString(),
            value: message.value.toString(),
          });
        },
      },
    );
  }
}
