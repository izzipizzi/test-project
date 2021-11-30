import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreatePostPartialData} from "../../posts/models/Post.model";
import {PostsService} from "../../posts/services/posts.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  newPostForm: FormGroup;
  maxTitleLength: number = 60;
  minTextLength: number = 3;
  maxTextLength: number = 7000;

  @Output() onSubmit = new EventEmitter<CreatePostPartialData>()

  constructor(private readonly formBuilder: FormBuilder) {
    this.newPostForm = formBuilder.group({
      title: this.formBuilder.control('', [Validators.required, Validators.minLength(this.minTextLength), Validators.maxLength(this.maxTitleLength)]),
      text: this.formBuilder.control('', [Validators.required, Validators.minLength(this.minTextLength), Validators.maxLength(this.maxTextLength)]),
    })
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.formValid) {
      const newPost: CreatePostPartialData = new CreatePostPartialData(this.newPostForm.get('title')?.value, this.newPostForm.get('text')?.value)
      this.onSubmit.emit(newPost)
      this.resetForm()
    } else return;
  }

  hasControlError(controlName: string): boolean {
    const formControl = this.newPostForm.get(controlName);
    return ((formControl?.touched || formControl?.dirty) && formControl.errors) as boolean
  }

  get titleError(): string {
    const formControl = this.newPostForm.get('title');
    if (formControl?.hasError('required')) {
      return 'Please enter post title.'
    } else if (formControl?.hasError('minlength')) {
      return `The title must be longer than ${this.minTextLength} characters.`
    } else if (formControl?.hasError('maxlength')) {
      return `The title must be no longer than ${this.maxTitleLength} characters.`
    }
    return ''
  }

  get textError(): string {
    const formControl = this.newPostForm.get('text');
    if (formControl?.hasError('required')) {
      return 'Please enter some text.'
    } else if (formControl?.hasError('minlength')) {
      return `The text must be longer than ${this.minTextLength} characters.`
    } else if (formControl?.hasError('maxlength')) {
      return `The text must be no longer than ${this.maxTextLength} characters.`
    }
    return ''
  }

  resetForm(): void {
    this.newPostForm.reset()
  }

  get formValid(): boolean {
    return this.newPostForm.valid
  }
}
