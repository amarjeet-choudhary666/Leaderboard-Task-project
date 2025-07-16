import { Controller, Get, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {

    constructor(private readonly leaderBoardService: LeaderboardService){}

    @Get()
    getLeaderBoard(){
        return this.leaderBoardService.getLeaderBoard();
    }

    @Get(':userId')
    getUserRank(@Param('userId') userId: string){
        return this.leaderBoardService.getUserRank(userId);
    }
}
