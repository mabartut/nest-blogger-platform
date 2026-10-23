import { CreatePostDto } from '../../application/dto/create-post.dto.ts';
import { UpdatePostDto } from '../../application/dto/update-post.dto.ts';

export class CreatePostInputDto implements CreatePostDto {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export class UpdatePostInputDto implements UpdatePostDto {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}
