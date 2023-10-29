import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScheduleDto {
    @IsNumber()
    @IsNotEmpty()
    tournamentid: number;
}

export class UpdateResultDto {
    @IsNumber()
    @IsNotEmpty()
    scorehome: number;

    @IsNumber()
    @IsNotEmpty()
    scoreaway: number;

    @IsNumber()
    @IsNotEmpty()
    resultid: number;
}