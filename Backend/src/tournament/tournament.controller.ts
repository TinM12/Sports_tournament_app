import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto, GetTournamentsDto } from './dto';

@Controller('tournament')
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @Post('/')
  create_tournament(@Body() dto: CreateTournamentDto) {
    return this.tournamentService.create_tournament(dto);
  }

  @Get('/')
  get_tournaments(@Body() dto: GetTournamentsDto) {
    return this.tournamentService.get_tournaments(dto);
  }

  @Get('/owner')
  get_owner(@Query('id') id: any) {
    return this.tournamentService.get_owner(id);
  }
}
