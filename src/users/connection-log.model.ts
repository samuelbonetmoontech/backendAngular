import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConnectionLogDocument = ConnectionLog & Document;

@Schema()
export class ConnectionLog {
  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop()
  userId: string;

  @Prop()
  login: boolean;
}

export const  ConnectionLogSchema = SchemaFactory.createForClass(ConnectionLog);
