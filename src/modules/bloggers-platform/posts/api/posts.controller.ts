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
import { PostsService } from '../application/posts.service.ts';
import { PostsQueryRepository } from '../infrastructure/query/posts.query-repository.ts';
import {
  CreatePostInputDto,
  UpdatePostInputDto,
} from './input-dto/posts.input-dto.ts';
import { GetPostsQueryParams } from './input-dto/get-posts-query-params.input-dto.ts';
import { PostViewDto } from './view-dto/posts.view-dto.ts';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto.ts';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postsQueryRepository.getByIdOrNotFoundFail(id);
  }

  @Get()
  async getAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQueryRepository.getAll(query);
  }

  @Post()
  async createPost(@Body() body: CreatePostInputDto) {
    const postId = await this.postsService.createPost(body);

    return this.postsQueryRepository.getByIdOrNotFoundFail(postId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostInputDto) {
    await this.postsService.updatePost(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string) {
    await this.postsService.deletePost(id);
  }
}
