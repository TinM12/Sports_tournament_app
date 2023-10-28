import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTournamentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    winpoints: number;

    @IsNumber()
    @IsNotEmpty()
    drawpoints: number;

    @IsNumber()
    @IsNotEmpty()
    losspoints: number;

    @IsString()
    @IsNotEmpty()
    contestants: string;

    @IsString()
    @IsNotEmpty()
    owner: string;
}

export class GetTournamentsDto {
    owner: string;
}
