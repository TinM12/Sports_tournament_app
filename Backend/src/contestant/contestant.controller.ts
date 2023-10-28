import { Controller, Get, Query } from '@nestjs/common';
import { ContestantService } from './contestant.service';

@Controller('contestant')
export class ContestantController {
    constructor(private contestantService: ContestantService) {}

    @Get()
    get_standings(@Query('id') id: any) {
        return this.contestantService.get_standings(id);
    }   
}
