import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { BlogDocument, BlogModelType } from '../domain/blog.entity.ts';
import { Blog } from '../domain/blog.entity.ts';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}

  async findById(id: string): Promise<BlogDocument | null> {
    return this.BlogModel.findById(id);
  }

  async findOrNotFoundFail(id: string): Promise<BlogDocument> {
    const blog = await this.findById(id);

    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    return blog;
  }

  async save(blog: BlogDocument): Promise<void> {
    await blog.save();
  }

  async delete(id: string): Promise<void> {
    await this.BlogModel.deleteOne({ _id: id });
  }
}
