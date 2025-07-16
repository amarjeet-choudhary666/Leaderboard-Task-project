import { Module, forwardRef } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from './schema/claim.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { ClaimGateway } from './claim.gateway';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {name: Claim.name, schema: ClaimSchema},
        {name: User.name, schema: UserSchema}
      ]
    ),
    forwardRef(() => LeaderboardModule),
  ],
  providers: [ClaimService, ClaimGateway],
  controllers: [ClaimController],
  exports: [ClaimGateway],
})
export class ClaimModule {}
