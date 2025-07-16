import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Claim, ClaimDocument } from './schema/claim.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { ClaimGateway } from './claim.gateway';
import { LeaderboardGateway } from 'src/leaderboard/leaderboard.gateway';

@Injectable()
export class ClaimService {

    constructor(
        @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly claimGateway: ClaimGateway,
        @Inject(forwardRef(() => LeaderboardGateway))
        private readonly leaderboardGateway: LeaderboardGateway,
    ) { }

    async createPoint(userId: string): Promise<{ user: UserDocument; points: number }> {
        try {
            const points = Math.floor(Math.random() * 10) + 1;

            const user = await this.userModel.findByIdAndUpdate(
                userId,
                { $inc: { totalPoints: points } },
                { new: true }
            );

            if (!user) throw new NotFoundException('User not found');

            const claim = await this.claimModel.create({
                userId: user._id,
                points,
                claimedAt: new Date()
            });

            // Emit websocket events for real-time updates
            try {
                this.claimGateway.emitClaimCreated(claim);
            } catch (wsError) {
                console.error('Error emitting claimCreated event:', wsError);
            }

            // Get updated leaderboard and emit
            try {
                const leaderboard = await this.leaderboardGateway['leaderboardService'].getLeaderBoard();
                this.leaderboardGateway.emitLeaderboardUpdated(leaderboard);
            } catch (leaderboardError) {
                console.error('Error emitting leaderboardUpdated event:', leaderboardError);
            }

            return { user, points };
        } catch (error) {
            console.error('Error in createPoint:', error);
            throw error;
        }
    }


    async getAllClaimHistory(): Promise<ClaimDocument[]> {
        return this.claimModel.find().populate('userId', 'name').sort({ claimedAt: -1 }).exec();
    }

    async getHistoryByUser(userId: string): Promise<ClaimDocument[]> {
        return this.claimModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }

}
