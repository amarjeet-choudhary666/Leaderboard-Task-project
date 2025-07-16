import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true }) 
export class Claim {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  points: number;

  @Prop({ default: Date.now })
  claimedAt: Date;
}

export type ClaimDocument = Claim & Document;
export const ClaimSchema = SchemaFactory.createForClass(Claim);
