import { CreateBlogDto } from '../../application/dto/create-blog.dto.ts';
import { UpdateBlogDto } from '../../application/dto/update-blog.dto.ts';

export class CreateBlogInputDto implements CreateBlogDto {
  name: string;
  description: string;
  websiteUrl: string;
}

export class UpdateBlogInputDto implements UpdateBlogDto {
  name: string;
  description: string;
  websiteUrl: string;
}
