import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; 
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://AMARJEET_1:manish@cluster1.9tyid.mongodb.net/'),
    UsersModule,
    LeaderboardModule,
    ClaimModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
