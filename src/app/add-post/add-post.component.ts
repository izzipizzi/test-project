import {Component, OnInit} from '@angular/core';
import {CreatePostPartialData} from "../posts/models/Post.model";
import {PostsService} from "../posts/services/posts.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private readonly postsService: PostsService) {
  }

  ngOnInit(): void {
  }

  addPost(postData: CreatePostPartialData) {
    this.postsService.addPost(postData)
  }
}
