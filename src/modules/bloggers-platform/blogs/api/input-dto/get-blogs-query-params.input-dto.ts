import { BlogsSortBy } from './blogs-sort-by.ts';
import { BaseQueryParams } from '../../../../../core/dto/base.query-params.input-dto.ts';

export class GetBlogsQueryParams extends BaseQueryParams {
  sortBy: BlogsSortBy = BlogsSortBy.CreatedAt;
  searchNameTerm: string | null = null;
}
