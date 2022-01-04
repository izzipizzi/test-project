import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { PostFormComponent } from './components/post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './components/post/post.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { OverlayLoadingDirective } from './directives/overlay.directive';

const COMPONENTS = [PostFormComponent, PostComponent, LoaderComponent];
const DIRECTIVES = [OverlayLoadingDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MaterialModule, ...COMPONENTS, ...DIRECTIVES],
})
export class SharedModule {}
