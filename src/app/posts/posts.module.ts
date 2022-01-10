import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { SharedModule } from '../shared/shared.module';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostsRoutingModule } from './posts-routing.module';
import { AddPostComponent } from './add-post/add-post.component';

@NgModule({
  declarations: [PostsComponent, PostInfoComponent, AddPostComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule],
})
export class PostsModule {}
