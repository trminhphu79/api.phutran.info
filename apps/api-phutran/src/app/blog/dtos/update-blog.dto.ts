import { IsString, IsArray, IsOptional, MinLength, MaxLength, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  @ApiProperty({
    description: 'The title of the blog post',
    example: 'Updated Blog Post Title',
    required: false,
    minLength: 3,
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    description: 'The content of the blog post',
    example: 'Updated content of my blog post...',
    required: false,
    minLength: 10
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;

  @ApiProperty({
    description: 'Tags for the blog post',
    example: ['technology', 'programming'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tag?: string[];
}
