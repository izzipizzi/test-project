import { Component, OnInit } from '@angular/core';
import { IPost } from 'shared';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
})
export class PostInfoComponent implements OnInit {
  post: IPost | null = null;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private readonly postsService: PostsService, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params) => this.postsService.getPostById(params['postId']))).subscribe((post) => {
      this.post = post;
      this.isLoading.next(false);
    });
  }
  handleLikeClick(postId: string) {
    //here will be added post like feature, after authorization implementation
  }
}
