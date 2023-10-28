import { Body, Controller, Get, Post, Query} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateScheduleDto } from './dto';

@Controller('result')
export class ResultController {
    constructor(private resultService: ResultService) {}

    @Post('/')
    create_schedule(@Body() dto: CreateScheduleDto) {
        return this.resultService.create_schedule(dto);
    }

    @Get()
    get_standings(@Query('id') id: any) {
        return this.resultService.get_results(id);
    }   
}
