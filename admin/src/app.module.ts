import { Module, OnModuleInit } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
import { AppController } from './app.controller';
import { ConsumerService } from './kafka/Consumer.service';

@Module({
  imports: [AdminsModule, ConfigModule.forRoot(), KafkaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit{
  constructor(private readonly consumer: ConsumerService) {}

  async onModuleInit() {
    await this.consumer.consume(
      { topics: ['user'] },
      {
        eachMessage: async ({ message, topic }) => {
          console.log({
            topic: topic.toString(),
            value: message.value.toString(),
          });
        },
      },
    );
  }
}
