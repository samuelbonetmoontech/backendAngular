import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/schemas/user.schema';
import { ConnectionLog, ConnectionLogSchema } from './users/connection-log.model';
import { ConnectionLogsService } from './users/connection-log.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './users/auth.controller';
import { AuthService } from './users/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'sH2!gS3FJ~P&*xRqgKLpUD$7oBhTnS#', 
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mydatabase'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ConnectionLog.name, schema: ConnectionLogSchema }, 
    ]),
  ],
  controllers: [UsersController,AuthController],
  providers: [UsersService,AuthService, ConnectionLogsService],
})
export class AppModule {}
