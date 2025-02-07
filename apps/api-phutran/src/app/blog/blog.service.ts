import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { User } from '../auth/user.model';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { SearchBlogDto } from './dtos/search-blog.dto';
import { Op } from 'sequelize';
import { UpdateBlogDto } from './dtos/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    return this.blogModel
      .create({
        ...createBlogDto,
      })
      .then((blog) => {
        return {
          data: blog,
          message: 'Blog created successfully',
        };
      });
  }

  async findAll() {
    return this.blogModel
      .findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username'], // Only return safe user fields
          },
        ],
      })
      .then((blogs) => {
        return {
          data: blogs,
          message: 'Blogs fetched successfully',
        };
      });
  }

  async search(searchDto: SearchBlogDto) {
    const { keyword, offset, limit } = searchDto;
    const trimmedKeyword = keyword.trim();
    const blogs = await this.blogModel.findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${trimmedKeyword}%`,
            },
          },
          {
            tag: {
              [Op.overlap]: [trimmedKeyword],
            },
          },
        ],
      },
      offset,
      limit,
    });

    return {
      data: blogs.rows,
      total: blogs.count,
      offset,
      limit,
    };
  }

  async findOne(id: number) {
    const blog = await this.blogModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return {
      data: blog,
    };
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogModel.findByPk(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    await blog.update(updateBlogDto);

    return {
      data: blog,
      message: 'Blog updated successfully',
    };
  }

  async remove(id: number) {
    const blog = await this.blogModel.findByPk(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    await blog.destroy();
    return { message: 'Blog deleted successfully' };
  }
}
