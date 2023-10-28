import { Module } from '@nestjs/common';
import { TournamentModule } from './tournament/tournament.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ResultModule } from './result/result.module';
import { ContestantModule } from './contestant/contestant.module';

@Module({
  imports: [TournamentModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), ResultModule, ContestantModule],
})
export class AppModule {}
