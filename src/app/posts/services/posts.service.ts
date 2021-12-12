import { Injectable } from '@angular/core';
import { CreatePostPartialData, Post } from '../models/Post.model';
import { Author } from '../models/Author.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  author = new Author('1', 'Andrew', 'Kirchei', 'assets/img/avatar.png');

  private posts = new BehaviorSubject<Post[]>([
    new Post(
      '1',
      this.author,
      'Some post title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      1,
      new Date()
    ),
    new Post(
      '2',
      this.author,
      'Some post title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      2,
      new Date()
    ),
    new Post(
      '3',
      this.author,
      'Some post title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      0,
      new Date()
    ),
    new Post(
      '4',
      this.author,
      'Some post title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      6,
      new Date()
    ),
    new Post(
      '4',
      this.author,
      'Some post title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      7,
      new Date()
    )
  ]);
  posts$ = this.posts.asObservable();

  constructor() {
  }

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  addPost(post: CreatePostPartialData): void {
    const newPost = new Post(this.randomId, this.getAuthor(), post.title, post.text, 0, new Date());
    this.posts.next([...this.posts.getValue(), newPost]);
  }

  getAuthor(): Author {
    return this.author;
  }

  get randomId(): string {
    return Math.floor(Math.random() * 1000).toString();
  }
}
