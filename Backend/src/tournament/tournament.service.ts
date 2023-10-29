import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTournamentDto, GetTournamentsDto } from './dto';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService) {}

    async create_tournament(dto: CreateTournamentDto) {
        try {
            const tournament = await this.prisma.tournament.create({
                data: {
                    name: dto.name,
                    owner: dto.owner,
                    winpoints: Number(dto.winpoints),
                    losspoints: Number(dto.losspoints),
                    drawpoints: Number(dto.drawpoints),
                }
            });

            const link = `${process.env.FRONTEND_URL}tournament/${dto.owner}?id=${tournament.tournamentid}`

            await this.prisma.tournament.update({
                where: {
                    tournamentid: tournament.tournamentid,
                },
                data: {
                    link: link
                }
            })

            let contestants = [];
            if(dto.contestants.indexOf(";") != -1) {
                contestants = dto.contestants.split(";");
            } else {
                contestants = dto.contestants.split("\n")
            }

            for(const contestant of contestants) {
                await this.prisma.contestant.create({
                    data: {
                        played: 0,
                        points: 0,
                        tournamentid: tournament.tournamentid,
                        contestantName: contestant
                    }
                });
            }
            
            const res = await this.prisma.tournament.findUnique({
                where: {
                    tournamentid: tournament.tournamentid
                }
            });
            return res
        } catch(err) {
            throw(err);
        }
    };

    async get_tournaments(dto: GetTournamentsDto) {
        try {
            const tournaments = await this.prisma.tournament.findMany({
                where: {
                    owner: dto.owner
                }
            });
    
            return tournaments;
        } catch(err) {
            throw(err)
        }
    };

    async get_owner(id: any) {
        try {
            const owner = await this.prisma.tournament.findUnique({
                where: {
                    tournamentid: parseInt(id)
                },
                select: {
                    owner: true
                }
            });

            return owner;
        } catch(err) {
            throw(err) 
        }
    };
    

    async get_tournament(id: any) {
        try {
            const tournament = await this.prisma.tournament.findUnique({
                where: {
                    tournamentid: parseInt(id)
                }
            });
    
            return tournament;   
        } catch(err) {
            throw(err);
        }
    }

}
