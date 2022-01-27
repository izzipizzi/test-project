import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsComponent } from './posts.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':postId',
    component: PostInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
