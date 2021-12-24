export interface Pagination {
  limit?: string;
  page?: string;
  skip?: string;
}
export interface Query extends Pagination {
  search?: string;
  order?: SortingOrder;
  sortBy?: PostSortByEnum;
}

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum PostSortByEnum {
  DATE_CREATED = 'dateCreated',
  LIKES = 'likes',
}

export const defaultPostQuery: Query = {
  search: '.',
  order: SortingOrder.ASC,
  sortBy: PostSortByEnum.DATE_CREATED,
  limit: '20',
};
