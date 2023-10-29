import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto, UpdateResultDto } from './dto';
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

    async get_results(id: any) {
        const results = await this.prisma.result.findMany({
            where: {
                tournamentid: parseInt(id)
            },
            select: {
                contestant_result_awaycontestandidTocontestant: {
                    select: {
                        contestantName: true
                    }
                },
                contestant_result_homecontestandidTocontestant: {
                    select: {
                        contestantName: true
                    }
                },
                scoreAway: true,
                scoreHome: true,
                round: true,
                resultid: true
            },
            orderBy: {
                resultid: 'asc'
            }
        });

        return results;
    };

    async update_result(dto: UpdateResultDto) {
        try {
            const currentScore = await this.prisma.result.findUnique({
                where: {
                    resultid: dto.resultid
                },
                select: {
                    scoreAway: true,
                    scoreHome: true
                }
            });

            await this.prisma.result.update({
                where: {
                    resultid: dto.resultid
                },
                data: {
                    scoreAway: dto.scoreaway,
                    scoreHome: dto.scorehome
                }
            });

            const contestants = await this.prisma.result.findUnique({
                where: {
                    resultid: dto.resultid
                }, 
                select: {
                    homecontestandid: true,
                    awaycontestandid: true,
                    tournament: true
                }
            });

            if(currentScore.scoreAway === null) {
                if(dto.scorehome > dto.scoreaway) {
                    await this.prisma.contestant.update({
                        where: {
                            contestandid: contestants.homecontestandid
                        }, 
                        data: {
                            points: {
                                increment: contestants.tournament.winpoints
                            },
                            played: {
                                increment: 1
                            }
                        }
                    });
    
                    await this.prisma.contestant.update({
                        where: {
                            contestandid: contestants.awaycontestandid
                        },
                        data: {
                            points: {
                                increment: contestants.tournament.losspoints
                            },
                            played: {
                                increment: 1
                            }
                        }
                    });
                } else if(dto.scorehome < dto.scoreaway) {
                    await this.prisma.contestant.update({
                        where: {
                            contestandid: contestants.homecontestandid
                        }, 
                        data: {
                            points: {
                                increment: contestants.tournament.losspoints
                            },
                            played: {
                                increment: 1
                            }
                        }
                    });
    
                    await this.prisma.contestant.update({
                        where: {
                            contestandid: contestants.awaycontestandid,
                        },
                        data: {
                            points: {
                                increment: contestants.tournament.winpoints
                            },
                            played: {
                                increment: 1
                            }
                        }
                    });
                } else {
                    await this.prisma.contestant.update({
                        where: {
                            contestandid: contestants.homecontestandid
                        }, 
                        data: {
                            points: {
                                increment: contestants.tournament.drawpoints
                            },
                            played: {
                                increment: 1
                            }
                        }
                    });
    
                    await this.prisma.contestant.update({
                        where: {
                            contestandid: contestants.awaycontestandid
                        },
                        data: {
                            points: {
                                increment: contestants.tournament.drawpoints
                            },
                            played: {
                                increment: 1
                            }
                        }
                    });
                };
            } else {
                if(currentScore.scoreAway > currentScore.scoreHome && !(dto.scoreaway > dto.scorehome)) {
                    if(dto.scoreaway == dto.scorehome) {
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.homecontestandid
                            }, 
                            data: {
                                points: {
                                    increment: (contestants.tournament.drawpoints - contestants.tournament.losspoints)
                                }
                            }
                        });
        
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.awaycontestandid
                            },
                            data: {
                                points: {
                                    increment: (contestants.tournament.drawpoints - contestants.tournament.winpoints)
                                }
                            }
                        });
                    } else {
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.homecontestandid
                            }, 
                            data: {
                                points: {
                                    increment: (contestants.tournament.winpoints - contestants.tournament.losspoints)
                                }
                            }
                        });
        
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.awaycontestandid
                            },
                            data: {
                                points: {
                                    increment: (contestants.tournament.losspoints - contestants.tournament.winpoints)
                                }
                            }
                        });
                    }
                } else if(currentScore.scoreHome > currentScore.scoreAway && !(dto.scorehome > dto.scoreaway)) {
                    if(dto.scoreaway == dto.scorehome) {
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.homecontestandid
                            }, 
                            data: {
                                points: {
                                    increment: (contestants.tournament.drawpoints - contestants.tournament.winpoints)
                                }
                            }
                        });
        
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.awaycontestandid
                            },
                            data: {
                                points: {
                                    increment: (contestants.tournament.drawpoints - contestants.tournament.losspoints)
                                }
                            }
                        });
                    } else {
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.homecontestandid
                            }, 
                            data: {
                                points: {
                                    increment: (contestants.tournament.losspoints - contestants.tournament.winpoints)
                                }
                            }
                        });
        
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.awaycontestandid
                            },
                            data: {
                                points: {
                                    increment: (contestants.tournament.winpoints - contestants.tournament.losspoints)
                                }
                            }
                        });
                    }
                } else if(currentScore.scoreHome == currentScore.scoreAway && !(dto.scoreaway == dto.scorehome)) {
                    if(dto.scoreaway > dto.scorehome) {
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.homecontestandid
                            }, 
                            data: {
                                points: {
                                    increment: (contestants.tournament.losspoints - contestants.tournament.drawpoints)
                                }
                            }
                        });
        
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.awaycontestandid
                            },
                            data: {
                                points: {
                                    increment: (contestants.tournament.winpoints - contestants.tournament.drawpoints)
                                }
                            }
                        });
                    } else {
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.homecontestandid
                            }, 
                            data: {
                                points: {
                                    increment: (contestants.tournament.winpoints - contestants.tournament.drawpoints)
                                }
                            }
                        });
        
                        await this.prisma.contestant.update({
                            where: {
                                contestandid: contestants.awaycontestandid
                            },
                            data: {
                                points: {
                                    increment: (contestants.tournament.losspoints - contestants.tournament.drawpoints)
                                }
                            }
                        });
                    }
                }
            }   
        } catch(err) {
            throw(err)
        }
    };
}
