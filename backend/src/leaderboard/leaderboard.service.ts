import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class LeaderboardService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getLeaderBoard(): Promise<{ userId: string; name: string; totalPoints: number; rank: number }[]> {
        const users = await this.userModel.find().sort({ totalPoints: -1 }).exec();

        return users.map((user, index) => ({
            userId: (user._id as Types.ObjectId).toString(),
            name: user.name,
            totalPoints: user.totalPoints,
            rank: index + 1,
        }));
    }

    async getUserRank(userId: string): Promise<{
        userId: string;
        name: string;
        totalPoints: number;
        rank: number;
    } | null> {
        const allUsers = await this.userModel
            .find()
            .sort({ totalPoints: -1 })
            .exec();

        const rank = allUsers.findIndex(
            (user) => (user._id as Types.ObjectId).toString() === userId,
        ) + 1;

        if (rank === 0) return null;

        const user = allUsers[rank - 1];

        return {
            userId: (user._id as Types.ObjectId).toString(),
            name: user.name,
            totalPoints: user.totalPoints,
            rank,
        };
    }
}
