import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { PostDocument, PostModelType } from '../domain/post.entity.ts';
import { Post } from '../domain/post.entity.ts';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private PostModel: PostModelType) {}

  async findById(id: string): Promise<PostDocument | null> {
    return this.PostModel.findById(id);
  }

  async findOrNotFoundFail(id: string): Promise<PostDocument> {
    const post = await this.findById(id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async findByBlogId(blogId: string): Promise<PostDocument[] | null> {
    return this.PostModel.find({ blogId });
  }

  async save(post: PostDocument): Promise<void> {
    await post.save();
  }

  async delete(id: string): Promise<void> {
    await this.PostModel.deleteOne({ _id: id });
  }
}
