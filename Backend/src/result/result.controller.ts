import { Body, Controller, Get, Post, Put, Query} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateScheduleDto, UpdateResultDto } from './dto';

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

    @Put()
    update_result(@Body() dto: UpdateResultDto) {
        return this.resultService.update_result(dto);
    }
}
