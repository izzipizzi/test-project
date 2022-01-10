import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { CreatePostDto } from 'shared';
import { ToastService } from '../../shared/services/toast.service';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly postsService: PostsService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {}

  addPost(postData: CreatePostDto) {
    this.spinnerService.show();
    this.postsService.addPost(postData).subscribe((data) => {
      this.spinnerService.hide();
      this.toastService.notification$.next(data.message);
      this.router.navigate(['/']);
    });
  }
}
