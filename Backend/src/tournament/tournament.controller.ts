import { Body, Controller, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto';

@Controller('tournament')
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @Post('/')
  create_tournament(@Body() dto: CreateTournamentDto) {
    return this.tournamentService.create_tournament(dto);
  }
}
