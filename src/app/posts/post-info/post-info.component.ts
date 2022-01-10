import { Component, OnInit } from '@angular/core';
import { Post } from 'shared';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-posts-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent implements OnInit {
  post: Post | null = null;

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.params.pipe(switchMap((params) => this.postsService.getPostById(params['postId']))).subscribe((post) => {
      this.post = post;
      this.spinnerService.hide();
    });
  }
  handleLikeClick(postId: string) {
    //here will be added posts like feature, after authorization implementation
  }
}
