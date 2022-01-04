import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { SharedModule } from '../../shared/shared.module';
import { PostInfoComponent } from './post-info/post-info.component';

@NgModule({
  declarations: [PostsComponent, PostInfoComponent],
  imports: [CommonModule, SharedModule],
})
export class PostsModule {}
