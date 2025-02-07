import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogService } from './blog.service';
import { SearchBlogDto } from './dtos/search-blog.dto';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { Public } from '../auth/public.decorator';

@ApiTags('blogs')
@ApiBearerAuth('access-token')
@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new blog post',
    description: 'Creates a new blog post with the provided title, content, and tags'
  })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Blog post created successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'My First Blog Post' },
            content: { type: 'string', example: 'This is the content...' },
            tag: { 
              type: 'array',
              items: { type: 'string' },
              example: ['technology', 'programming']
            },
            authorId: { type: 'number', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        message: { type: 'string', example: 'Blog created successfully' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Public()
  @Get()
  @ApiOperation({ 
    summary: 'Get all blog posts',
    description: 'Retrieves all blog posts with their authors\' information'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all blog posts',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'My Blog Post' },
              content: { type: 'string', example: 'Content...' },
              tag: { 
                type: 'array',
                items: { type: 'string' },
                example: ['technology', 'programming']
              },
              authorId: { type: 'number', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              author: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  username: { type: 'string', example: 'johndoe' }
                }
              }
            }
          }
        },
        message: { type: 'string', example: 'Blogs fetched successfully' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.blogService.findAll();
  }

  @Public()
  @Post('search')
  @ApiOperation({ 
    summary: 'Search blog posts',
    description: 'Search blog posts by keyword in title and tags with pagination'
  })
  @ApiBody({ type: SearchBlogDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns matching blog posts with pagination info',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'My Blog Post' },
              content: { type: 'string', example: 'Content...' },
              tag: { 
                type: 'array',
                items: { type: 'string' },
                example: ['technology', 'programming']
              },
              authorId: { type: 'number', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        },
        total: { type: 'number', example: 10 },
        offset: { type: 'number', example: 0 },
        limit: { type: 'number', example: 10 }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  search(@Body() searchDto: SearchBlogDto) {
    return this.blogService.search(searchDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a blog post by ID',
    description: 'Retrieves a specific blog post by its ID with author information'
  })
  @ApiParam({ name: 'id', description: 'Blog post ID', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the blog post',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'My Blog Post' },
            content: { type: 'string', example: 'Content...' },
            tag: { 
              type: 'array',
              items: { type: 'string' },
              example: ['technology', 'programming']
            },
            authorId: { type: 'number', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            author: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                username: { type: 'string', example: 'johndoe' }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Blog post not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Blog with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update a blog post',
    description: 'Updates an existing blog post with the provided data'
  })
  @ApiParam({ name: 'id', description: 'Blog post ID', example: 1 })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Blog post updated successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'Updated Blog Post' },
            content: { type: 'string', example: 'Updated content...' },
            tag: { 
              type: 'array',
              items: { type: 'string' },
              example: ['technology', 'programming']
            },
            authorId: { type: 'number', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        message: { type: 'string', example: 'Blog updated successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Blog post not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Blog with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a blog post',
    description: 'Deletes a blog post by its ID'
  })
  @ApiParam({ name: 'id', description: 'Blog post ID', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Blog post deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Blog deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Blog post not found',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Blog with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: 404 }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
