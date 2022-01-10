import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'shared';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('post') post: Post | null = null;

  @Output() onLikeClick = new EventEmitter<string>();

  isOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleOpened(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpened = !this.isOpened;
  }

  get postLikes(): string {
    return this.post?.likes?.length ? 'warn' : '';
  }

  addPostLike(event: MouseEvent) {
    event.stopPropagation();
    this.onLikeClick.emit(this.post?._id);
  }
}
