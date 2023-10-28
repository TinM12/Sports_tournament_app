import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScheduleDto {
    @IsNumber()
    @IsNotEmpty()
    tournamentid: number;
}