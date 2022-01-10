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
export declare enum SortingOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum PostSortByEnum {
    DATE_CREATED = "dateCreated",
    LIKES = "likes"
}
export declare const defaultPostQuery: Query;
