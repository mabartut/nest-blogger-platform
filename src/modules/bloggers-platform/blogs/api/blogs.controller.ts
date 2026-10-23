import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from '../application/blogs.service.ts';
import { BlogsQueryRepository } from '../infrastructure/query/blogs.query-repository.ts';
import {
  CreateBlogInputDto,
  UpdateBlogInputDto,
} from './input-dto/blogs.input-dto.ts';
import { GetBlogsQueryParams } from './input-dto/get-blogs-query-params.input-dto.ts';
import { BlogViewDto } from './view-dto/blogs.view-dto.ts';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto.ts';
import { GetPostsQueryParams } from '../../posts/api/input-dto/get-posts-query-params.input-dto.ts';
import { PostViewDto } from '../../posts/api/view-dto/posts.view-dto.ts';
import { PostsQueryRepository } from '../../posts/infrastructure/query/posts.query-repository.ts';
import { CreatePostInputDto } from '../../posts/api/input-dto/posts.input-dto.ts';
import { PostsService } from '../../posts/application/posts.service.ts';
import { BlogsRepository } from '../infrastructure/blogs.repository.ts';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsService: BlogsService,
    private blogsRepository: BlogsRepository,
    private blogsQueryRepository: BlogsQueryRepository,
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.blogsQueryRepository.getByIdOrNotFoundFail(id);
  }

  @Get()
  async getAll(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAll(query);
  }

  @Get(':id/posts')
  async getAllPostsOfBlog(
    @Param('id') id: string,
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    await this.blogsRepository.findOrNotFoundFail(id);

    return this.postsQueryRepository.getAllPostsOfBlog(id, query);
  }

  @Post()
  async createBlog(@Body() body: CreateBlogInputDto) {
    const blogId = await this.blogsService.createBlog(body);

    return this.blogsQueryRepository.getByIdOrNotFoundFail(blogId);
  }

  @Post(':blogId/posts')
  async createPostForBlog(
    @Param('blogId') blogId: string,
    @Body() body: Omit<CreatePostInputDto, 'blogId'>,
  ) {
    const postId = await this.postsService.createPost({
      blogId,
      title: body.title,
      content: body.content,
      shortDescription: body.shortDescription,
    });

    return this.postsQueryRepository.getByIdOrNotFoundFail(postId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlog(@Param('id') id: string, @Body() body: UpdateBlogInputDto) {
    await this.blogsService.updateBlog(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlog(id);
  }
}
