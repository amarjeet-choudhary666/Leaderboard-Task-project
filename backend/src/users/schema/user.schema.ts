import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: 0 }) 
  totalPoints: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
