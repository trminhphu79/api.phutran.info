import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchBlogDto {
  @ApiProperty({
    description: 'Search keyword for blog title or tags',
    example: 'technology',
    required: true,
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  keyword: string;

  @ApiProperty({
    description: 'Number of items to skip',
    example: 0,
    default: 0,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  offset: number;

  @ApiProperty({
    description: 'Maximum number of items to return',
    example: 10,
    default: 10,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit: number;
}
