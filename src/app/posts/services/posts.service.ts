import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from '../../shared/api-routes';
import {
  CreatePostDto,
  Post,
  PostLikeCreateDto,
  PostSortByEnum,
  PostsResponseDto,
  SortingOrder,
  UserResponseDto,
} from 'shared';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  author: UserResponseDto = {
    _id: '61c355cecf6126614e00f1fd',
    avatar: 'assets/img/avatar.png',
    nickname: '',
  };

  postsQuery = new HttpParams({
    fromObject: {
      search: '',
      order: SortingOrder.ASC,
      sortBy: PostSortByEnum.DATE_CREATED,
      limit: 20,
      page: 0,
      skip: 0,
    },
  });

  constructor(private readonly httpClient: HttpClient) {}

  getPosts(): Observable<PostsResponseDto> {
    return this.httpClient.get<PostsResponseDto>(API.getAllPosts(), { params: this.postsQuery });
  }

  getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>(API.getPostById(id));
  }

  likePost(postLikeCreateData: PostLikeCreateDto): Observable<void> {
    return this.httpClient.post<void>(API.addPostLike(), postLikeCreateData);
  }

  addPost(post: CreatePostDto): Observable<any> {
    post.author = this.author._id;
    return this.httpClient.post(API.addPost(), post);
  }

  setPostsPagination(param: string, value: string | number) {
    this.postsQuery.set(param, value);
  }
}
