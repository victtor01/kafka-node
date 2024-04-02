import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './Consumer.service';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
