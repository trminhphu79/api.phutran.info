import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create-user.dto';
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

  async signUp(createUserDto: CreateUserDto) {
    try {
      // Check if user exists
      const existingUser = await this.userModel.findOne({
        where: { username: createUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create new user
      const user = await this.userModel.create({
        username: createUserDto.username,
        password: hashedPassword,
        role: createUserDto.role || 'user',
      });

      // Generate JWT token
      const token = this.jwtService.sign({
        sub: user.id,
        username: user.username,
        role: user.role,
      });

      // Get user data without password
      const userData = user.toJSON();
      delete userData.password;

      return {
        user: userData,
        token,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
