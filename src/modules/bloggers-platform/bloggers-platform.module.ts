import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/domain/blog.entity.ts';
import { BlogsController } from './blogs/api/blogs.controller.ts';
import { Post, PostSchema } from './posts/domain/post.entity.ts';
import { PostsController } from './posts/api/posts.controller.ts';
import { PostsQueryRepository } from './posts/infrastructure/query/posts.query-repository.ts';
import { PostsService } from './posts/application/posts.service.ts';
import { PostsRepository } from './posts/infrastructure/posts.repository.ts';
import { BlogsService } from './blogs/application/blogs.service.ts';
import { BlogsRepository } from './blogs/infrastructure/blogs.repository.ts';
import { BlogsQueryRepository } from './blogs/infrastructure/query/blogs.query-repository.ts';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [BlogsController, PostsController],
  providers: [
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    PostsService,
    PostsRepository,
    PostsQueryRepository,
  ],
})
export class BloggersPlatformModule {}
