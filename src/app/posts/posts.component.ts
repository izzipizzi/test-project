import {Component, OnInit} from '@angular/core';
import {Post} from "./models/Post.model";
import {PostsService} from "./services/posts.service";
import {Author} from "./models/Author.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = []

  constructor(private readonly postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

}
