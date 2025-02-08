import {
  IsString,
  IsArray,
  IsNotEmpty,
  MinLength,
  MaxLength,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog post',
    example: 'My First Blog Post',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'The content of the blog post',
    example: 'This is the content of my blog post...',
    minLength: 10,
  })
  @IsNotEmpty()
  content: Record<string, any>;

  @ApiProperty({
    description: 'Tags for the blog post',
    example: ['technology', 'programming'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tag: string[];

  //thumbnail
  @ApiProperty({
    description: 'Thumbnail of the blog post',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    description: 'Description of the blog post',
    example: 'This is the description of my blog post...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Slug of the blog post',
    example: 'my-first-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
