import { UserResponseDto } from './User';
import { Like } from './Like';
import { Comment } from './Comment';
import { Tag } from './Tag';
export interface Post extends PostPartialDto {
    _id: string;
    likes: Like[];
    dateCreated: Date;
    comments: Comment[];
    tags: Tag[];
    author?: UserResponseDto;
}
export interface PostsResponseDto {
    totalCount: number;
    page: number;
    posts: Post[];
}
export interface CreatePostDto extends PostPartialDto {
    author?: string;
}
export interface PostPartialDto {
    title: string;
    text: string;
}
