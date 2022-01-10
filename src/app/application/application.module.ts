import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { SharedModule } from '../shared/shared.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { PostsModule } from './posts/posts.module';
import { AddPostModule } from './add-post/add-post.module';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [ApplicationComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, PostsModule, AddPostModule, ApplicationRoutingModule],
})
export class ApplicationModule {}
