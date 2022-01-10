import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Router } from '@angular/router';
import { IPost } from 'shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  isPostsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isTagsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private readonly postsService: PostsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((postsResponse) => {
      this.posts = postsResponse.posts;
      this.isPostsLoading.next(false);
    });
  }

  toPost(id: string): void {
    this.router.navigate(['/feed', id]);
  }
}
