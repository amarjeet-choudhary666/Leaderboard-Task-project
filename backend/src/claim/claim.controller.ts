import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { UserDocument } from 'src/users/schema/user.schema';
import { ClaimDocument } from './schema/claim.schema';

@Controller('claim')
export class ClaimController {

    constructor(private readonly claimService: ClaimService){}

    @Post(':userId')
    async claimPoints(@Param('userId') userId: string): Promise<{user: UserDocument; points: number}>{
        return this.claimService.createPoint(userId);
    }

     @Get('history')
  async getAllClaimHistory(): Promise<ClaimDocument[]> {
    return this.claimService.getAllClaimHistory();
  }

  @Get('history/:userId')
  async getUserClaimHistory(@Param('userId') userId: string): Promise<ClaimDocument[]> {
    return this.claimService.getHistoryByUser(userId);
  }
  
}
