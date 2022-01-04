import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AddPostComponent],
  imports: [CommonModule, SharedModule],
})
export class AddPostModule {}
