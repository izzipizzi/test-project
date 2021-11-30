import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../models/Post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post | null = null;

  isOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  showMore() {
    this.isOpened = true;
  }

  showLess() {
    this.isOpened = false;
  }

  get authorInfo(): string {
    return `${this.post?.author.name} ${this.post?.author.surname}`
  }

  get postLikes(): string {
    if (this.post?.likes) {
      return this.post?.likes > 0 ? 'liked' : '';
    }
    return ''
  }

}
