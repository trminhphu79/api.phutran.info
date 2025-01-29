import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userModel.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.username, sub: user.id };

      return {
        accessToken: this.jwtService.sign(payload),
        message: 'Sign in successfully',
      };
    }
    return null;
  }
}
