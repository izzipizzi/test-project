import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts/services/posts.service';
import { Router } from '@angular/router';
import { CreatePostData } from 'shared';
import { ToastService } from '../../shared/services/toast.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly postsService: PostsService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {}

  addPost(postData: CreatePostData) {
    this.isLoading.next(true);
    this.postsService.addPost(postData).subscribe((data) => {
      this.isLoading.next(false);
      this.toastService.notification$.next(data.message);
      this.router.navigate(['/']);
    });
  }
}
