import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() signInDto: { username: string; password: string }
  ) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password
    );
    
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return result;
  }
} 