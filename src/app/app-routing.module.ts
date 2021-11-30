import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from "./posts/posts.component";
import {AddPostComponent} from "./add-post/add-post.component";

const routes: Routes = [
  {
    path: 'add-post', component: AddPostComponent
  },
  {
    path: '', component: PostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
