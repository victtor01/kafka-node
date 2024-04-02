import { Module } from '@nestjs/common';
import { PrismaService } from './prsima.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
