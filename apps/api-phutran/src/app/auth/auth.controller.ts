import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
} 