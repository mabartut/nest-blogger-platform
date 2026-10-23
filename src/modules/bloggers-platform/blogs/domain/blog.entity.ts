import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateBlogDomainDto } from './dto/create-blog.domain.dto.ts';
import { HydratedDocument, Model } from 'mongoose';
import { UpdateBlogDomainDto } from './dto/update-blog.domain.dto.ts';

@Schema({ timestamps: true })
export class Blog {
  @Prop({ type: String, required: true, maxlength: 100 })
  name: string;

  @Prop({ type: String, maxlength: 1000 })
  description: string;

  @Prop({ type: String, maxlength: 1000 })
  websiteUrl: string;

  @Prop({ type: Boolean, default: false })
  isMembership: boolean;

  createdAt: Date;
  updatedAt: Date;

  updateBlog(dto: UpdateBlogDomainDto) {
    this.name = dto.name;
    this.description = dto.description;
    this.websiteUrl = dto.websiteUrl;
  }

  static createBlog(
    this: BlogModelType,
    dto: CreateBlogDomainDto,
  ): BlogDocument {
    const blog = new this();

    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    blog.isMembership = false;

    return blog;
  }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.loadClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument> & typeof Blog;
