import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { BlogModelType } from '../domain/blog.entity.ts';
import { Blog } from '../domain/blog.entity.ts';
import { BlogsRepository } from '../infrastructure/blogs.repository.ts';
import { CreateBlogDto } from './dto/create-blog.dto.ts';
import { UpdateBlogDto } from './dto/update-blog.dto.ts';
import { PostsRepository } from '../../posts/infrastructure/posts.repository.ts';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private BlogModel: BlogModelType,
    private blogsRepository: BlogsRepository,
    private postsRepository: PostsRepository,
  ) {}

  async createBlog(dto: CreateBlogDto): Promise<string> {
    const blog = this.BlogModel.createBlog({
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
    });

    await this.blogsRepository.save(blog);

    return blog._id.toString();
  }

  async updateBlog(id: string, dto: UpdateBlogDto): Promise<void> {
    const blog = await this.blogsRepository.findOrNotFoundFail(id);

    blog.updateBlog(dto);

    await this.blogsRepository.save(blog);
  }

  async deleteBlog(id: string) {
    await this.blogsRepository.findOrNotFoundFail(id);

    const posts = await this.postsRepository.findByBlogId(id);

    if (posts && posts.length > 0) {
      throw new NotFoundException('Blog has posts, deleting blog not allowed');
    }

    await this.blogsRepository.delete(id);
  }
}
