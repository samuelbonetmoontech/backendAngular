import { Controller, Post, Body } from '@nestjs/common';
import { ConnectionLogsService } from './connection-log.service';


@Controller('connection-logs')
export class ConnectionLogsController {
  constructor(private readonly connectionLogsService: ConnectionLogsService) {}

  @Post()
  async createConnectionLog(@Body() body: any) {
    const { userId, login } = body;
    return this.connectionLogsService.create(userId, login);
  }
}
