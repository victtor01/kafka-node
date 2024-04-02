import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';

@Module({
  controllers: [AdminsController]
})
export class AdminsModule {}
