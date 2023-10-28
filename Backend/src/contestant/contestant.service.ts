import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContestantService {
    constructor(private prisma: PrismaService) {}

    async get_standings(id: any) {
        
        try {
            const standings = await this.prisma.contestant.findMany({
                where: {
                    tournamentid: parseInt(id)
                }
            });
    
            return standings;   
        }   catch(err) {
            throw(err)
        }
    }

}
