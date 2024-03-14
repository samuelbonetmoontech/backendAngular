import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.usersService.findByCredentials(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = await this.authService.generateToken(user.email);
    console.log(token);
    
    return { token };
  }
}
