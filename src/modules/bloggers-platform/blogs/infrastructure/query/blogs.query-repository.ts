import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { BlogModelType } from '../../domain/blog.entity.ts';
import { Blog } from '../../domain/blog.entity.ts';
import { BlogViewDto } from '../../api/view-dto/blogs.view-dto.ts';
import { GetBlogsQueryParams } from '../../api/input-dto/get-blogs-query-params.input-dto.ts';
import { QueryFilter } from 'mongoose';
import { PaginatedViewDto } from '../../../../../core/dto/base.paginated.view-dto.ts';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}

  async getByIdOrNotFoundFail(id: string): Promise<BlogViewDto> {
    const blog = await this.BlogModel.findById(id).lean();

    if (!blog) throw new NotFoundException('Blog not found');

    return BlogViewDto.mapToView(blog);
  }

  async getAll(
    query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    const filter: QueryFilter<Blog> = {};

    if (query.searchNameTerm) {
      filter.name = { $regex: query.searchNameTerm, $options: 'i' };
    }

    const [blogs, totalCount] = await Promise.all([
      this.BlogModel.find(filter)
        .sort({ [query.sortBy]: query.sortDirection })
        .skip(query.calculateSkip())
        .limit(query.pageSize),

      this.BlogModel.countDocuments(filter),
    ]);

    const items = blogs.map(BlogViewDto.mapToView);

    return PaginatedViewDto.mapToView({
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items,
    });
  }
}
