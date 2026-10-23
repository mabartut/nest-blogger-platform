import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PostModelType } from '../domain/post.entity.ts';
import { Post } from '../domain/post.entity.ts';
import { PostsRepository } from '../infrastructure/posts.repository.ts';
import { CreatePostDto } from './dto/create-post.dto.ts';
import { UpdatePostDto } from './dto/update-post.dto.ts';
import { BlogsRepository } from '../../blogs/infrastructure/blogs.repository.ts';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: PostModelType,
    private postsRepository: PostsRepository,
    private blogsRepository: BlogsRepository,
  ) {}

  async createPost(dto: CreatePostDto): Promise<string> {
    const blog = await this.blogsRepository.findOrNotFoundFail(dto.blogId);

    const post = this.PostModel.createPost({
      title: dto.title,
      content: dto.content,
      shortDescription: dto.shortDescription,
      blogId: dto.blogId,
      blogName: blog.name,
    });

    await this.postsRepository.save(post);

    return post._id.toString();
  }

  async updatePost(id: string, dto: UpdatePostDto): Promise<void> {
    const post = await this.postsRepository.findOrNotFoundFail(id);

    post.updatePost(dto);

    await this.postsRepository.save(post);
  }

  async deletePost(id: string) {
    await this.postsRepository.findOrNotFoundFail(id);

    await this.postsRepository.delete(id);
  }
}
