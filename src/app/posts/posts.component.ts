import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Router } from '@angular/router';
import { Post } from 'shared';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../shared/services/spinner.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private readonly postsService: PostsService,
    private readonly router: Router,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.postsService.getPosts().subscribe((postsResponse) => {
      this.posts = postsResponse.posts;
      this.spinnerService.hide();
    });
  }

  toPost(postId: string): void {
    this.router.navigate(['/app', postId]);
  }
}
