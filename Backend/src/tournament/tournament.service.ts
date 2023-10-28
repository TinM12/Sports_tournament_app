import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTournamentDto } from './dto';

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

            const link = `${process.env.FRONTEND_URL}tournament/${dto.owner}/${tournament.tournamentid}`

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
            
            return tournament;
        } catch(err) {
            throw(err);
        }
    }

}
