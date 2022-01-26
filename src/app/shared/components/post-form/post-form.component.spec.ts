import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostDto } from 'shared';
import { first } from 'rxjs';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      imports: [SharedModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid if empty', () => {
    expect(component.formValid).toBeFalsy();
  });

  it('should show empty text error', () => {
    let text = component.newPostForm.get('text');
    expect(text?.valid).toBeFalsy();
  });

  it('should show text min length error message', () => {
    let text = component.newPostForm.get('text');
    text?.setValue('em');
    expect(component.textError).toBe(<string>component.validationErrors.text.get('minlength'));
  });

  it('should show empty title error', () => {
    let title = component.newPostForm.get('title');
    expect(title?.valid).toBeFalsy();
  });

  it('should show empty title error', () => {
    let title = component.newPostForm.get('title');
    expect(title?.valid).toBeFalsy();
  });

  it('should show title min length error message', () => {
    let title = component.newPostForm.get('title');
    title?.setValue('em');
    expect(component.titleError).toBe(<string>component.validationErrors.title.get('minlength'));
  });

  it('should output valid form data', () => {
    const postDto: CreatePostDto = {
      text: 'Dummy text value',
      title: 'Some cool title',
    };

    component.newPostForm.get('title')?.setValue(postDto.title);
    component.newPostForm.get('text')?.setValue(postDto.text);

    let result = {};

    component.onSubmit.subscribe((data) => {
      return (result = data);
    });
    component.submitForm();
    expect(result).toEqual(postDto);
  });

  it('should not output invalid form data', () => {
    const postDto: CreatePostDto = {
      text: 'Du',
      title: 'So',
    };

    component.newPostForm.get('title')?.setValue(postDto.title);
    component.newPostForm.get('text')?.setValue(postDto.text);
    let result = null;

    component.onSubmit.pipe(first()).subscribe((data) => {
      result = data;
    });

    component.submitForm();
    expect(result).toBeNull();
  });
});
