import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreatePostDomainDto } from './dto/create-post.domain.dto.ts';
import { HydratedDocument, Model } from 'mongoose';
import { UpdatePostDomainDto } from './dto/update-post.domain.dto.ts';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true, maxlength: 100 })
  title: string;

  @Prop({ type: String, maxlength: 1000 })
  shortDescription: string;

  @Prop({ type: String, maxlength: 1000 })
  content: string;

  @Prop({ type: String, required: true, maxlength: 100 })
  blogId: string;

  @Prop({ type: String, required: true, maxlength: 100 })
  blogName: string;

  createdAt: Date;
  updatedAt: Date;

  updatePost(dto: UpdatePostDomainDto) {
    this.title = dto.title;
    this.shortDescription = dto.shortDescription;
    this.content = dto.content;
    this.blogId = dto.blogId;
  }

  static createPost(
    this: PostModelType,
    dto: CreatePostDomainDto,
  ): PostDocument {
    const post = new this();

    post.title = dto.title;
    post.content = dto.content;
    post.shortDescription = dto.shortDescription;
    post.blogId = dto.blogId;
    post.blogName = dto.blogName;

    return post;
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);

export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;
