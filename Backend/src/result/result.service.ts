import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto } from './dto';
import robin = require('roundrobin');


@Injectable()
export class ResultService {
    constructor(private prisma: PrismaService) {}

    async create_schedule(dto: CreateScheduleDto) {

        try {
            const contestants = await this.prisma.contestant.findMany({
                where: {
                    tournamentid: dto.tournamentid
                },
                select: {
                    contestandid: true
                }
            });

            const schedule = robin(contestants.length);
            let round = 0;
            for(const row of schedule) {
                round++;
                for(const pair of row) {
                    await this.prisma.result.create({
                        data: {
                            round: round,
                            contestant_result_awaycontestandidTocontestant: {
                                connect: {
                                    contestandid: contestants[pair[1] - 1].contestandid
                                }
                            },
                            contestant_result_homecontestandidTocontestant: {
                                connect: {
                                    contestandid: contestants[pair[0] - 1].contestandid
                                }
                            },
                            tournament: {
                                connect: {
                                    tournamentid: dto.tournamentid
                                }
                            }
                        }
                    })
                }
            }


        } catch(err) {
            throw(err)
        }
    };

}
