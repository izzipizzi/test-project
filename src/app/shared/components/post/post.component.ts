import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'shared';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('post') post: IPost | null = null;

  @Output() onLikeClick = new EventEmitter<string>();

  isOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleOpened(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpened ? (this.isOpened = false) : (this.isOpened = true);
  }

  get postLikes(): string {
    if (this.post?.likes.length) {
      return this.post.likes.length > 0 ? 'warn' : '';
    }
    return '';
  }

  addPostLike(event: MouseEvent) {
    event.stopPropagation();
    this.onLikeClick.emit(this.post?._id);
  }
}
