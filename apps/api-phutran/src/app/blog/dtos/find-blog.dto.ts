import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindBlogDto {
  @ApiProperty({
    description: 'The slug of the blog post',
    example: 'my-first-blog-post',
  })
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'The id of the blog post',
    example: 1,
  })
  @IsNumber()
  id?: number;
}
