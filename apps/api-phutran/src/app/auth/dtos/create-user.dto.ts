import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for the account',
    example: 'johndoe',
    minLength: 3,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_-]*$/, {
    message: 'Username can only contain letters, numbers, underscores and hyphens'
  })
  username: string;

  @ApiProperty({
    description: 'Password for the account',
    example: 'StrongP@ssw0rd',
    minLength: 6,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
  })
  password: string;

  // @ApiProperty({
  //   description: 'User role',
  //   example: 'user',
  //   enum: ['user', 'admin']
  // })
  // @IsString()
  // @IsNotEmpty()
  // @Matches(/^(user|admin)$/, {
  //   message: 'Role must be either "user" or "admin"'
  // })
  // role: string;
}
