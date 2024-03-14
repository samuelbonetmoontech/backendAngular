
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectionLog, ConnectionLogDocument } from './connection-log.model';

@Injectable()
export class ConnectionLogsService {
  constructor(@InjectModel(ConnectionLog.name) private connectionLogModel: Model<ConnectionLogDocument>) {}

  async create(userId: string, login: boolean): Promise<ConnectionLog> {
    const newConnectionLog = new this.connectionLogModel({ userId, login });
    return newConnectionLog.save();
  }

  async findAllByUserId(userId: string): Promise<ConnectionLog[]> {
    return this.connectionLogModel.find({ userId }).exec();
  }
}
