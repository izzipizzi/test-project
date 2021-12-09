import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePostPartialData } from '../../posts/models/Post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  newPostForm: FormGroup;
  private readonly maxTitleLength: number = 60;
  private readonly minTextLength: number = 3;
  private readonly maxTextLength: number = 7000;

  private readonly validationErrors = {
    title: new Map<string, string>([
      ['required', 'Please enter post title.'],
      ['minlength', `The title must be longer than ${this.minTextLength} characters.`],
      ['maxlength', `The title must be no longer than ${this.maxTitleLength} characters.`],
    ]),
    text: new Map<string, string>([
      ['required', 'Please enter some text.'],
      ['minLength', `The text must be longer than ${this.minTextLength} characters.`],
      ['maxlength', `The text must be no longer than ${this.maxTitleLength} characters.`],
    ]),
  };

  @Output() onSubmit = new EventEmitter<CreatePostPartialData>();

  constructor(private readonly formBuilder: FormBuilder) {
    this.newPostForm = formBuilder.group({
      title: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(this.minTextLength),
        Validators.maxLength(this.maxTitleLength),
      ]),
      text: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(this.minTextLength),
        Validators.maxLength(this.maxTextLength),
      ]),
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.formValid) {
      const newPost: CreatePostPartialData = new CreatePostPartialData(
        this.newPostForm.get('title')?.value,
        this.newPostForm.get('text')?.value
      );
      this.onSubmit.emit(newPost);
      this.resetForm();
    } else return;
  }

  hasControlError(controlName: string): boolean {
    const formControl = this.newPostForm.get(controlName);
    return ((formControl?.touched || formControl?.dirty) && formControl.errors) as boolean;
  }

  get titleError(): string {
    const formControl = this.newPostForm.get('title');
    for (let errorsKey in formControl?.errors) {
      if (this.validationErrors?.title.has(errorsKey)) {
        return <string>this.validationErrors?.title?.get(errorsKey);
      }
    }
    return '';
  }

  get textError(): string {
    const formControl = this.newPostForm.get('text');
    for (let errorsKey in formControl?.errors) {
      if (this.validationErrors?.text.has(errorsKey)) {
        return <string>this.validationErrors?.title?.get(errorsKey);
      }
    }

    return '';
  }

  resetForm(): void {
    this.newPostForm.reset();
  }

  get formValid(): boolean {
    return this.newPostForm.valid;
  }
}
