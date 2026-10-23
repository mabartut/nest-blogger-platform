import { PostsSortBy } from './posts-sort-by.ts';
import { BaseQueryParams } from '../../../../../core/dto/base.query-params.input-dto.ts';

export class GetPostsQueryParams extends BaseQueryParams {
  sortBy: PostsSortBy = PostsSortBy.CreatedAt;
}
