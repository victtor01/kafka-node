import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './kafka/Consumer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('')
export class AppController {
  @MessagePattern('user')
  async index(@Payload() message: any) {
    console.log('MENSAGE', message);
    return 'hello world!';
  }
}
