import { Module } from '@nestjs/common';
import { TournamentModule } from './tournament/tournament.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TournamentModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],
})
export class AppModule {}
