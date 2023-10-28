import { Module } from '@nestjs/common';
import { ContestantController } from './contestant.controller';
import { ContestantService } from './contestant.service';

@Module({
  controllers: [ContestantController],
  providers: [ContestantService]
})
export class ContestantModule {}
