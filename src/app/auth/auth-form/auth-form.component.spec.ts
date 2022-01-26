import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginDto } from 'shared';
import { first } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
      imports: [SharedModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
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

  it('should show empty nickname error', () => {
    let nickname = component.authForm.get('nickname');
    expect(nickname?.valid).toBeFalsy();
  });

  it('should show nickname min length error message', () => {
    let nickname = component.authForm.get('nickname');
    nickname?.setValue('em');
    expect(component.nicknameError).toBe(<string>component.validationErrors.nickname.get('minlength'));
  });

  it('should show empty password error', () => {
    let password = component.authForm.get('password');
    expect(password?.valid).toBeFalsy();
  });

  it('should show password pattern error', () => {
    let password = component.authForm.get('password');
    password?.setValue('badPassword');
    let errors = password?.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('should show password pattern error message', () => {
    let password = component.authForm.get('password');
    password?.setValue('badPassword');
    expect(component.passwordError).toBe(<string>component.validationErrors.password.get('pattern'));
  });

  it('should show password min length error message', () => {
    let password = component.authForm.get('password');
    password?.setValue('bp');
    expect(component.passwordError).toBe(<string>component.validationErrors.password.get('minlength'));
  });

  it('should not display confirm password field', () => {
    let confirmPassword = component.authForm.get('confirmPassword');
    expect(confirmPassword).toBeNull();
  });

  it('should display confirm password field', () => {
    component.isSignUp = true;
    component.ngOnInit();
    let confirmPassword = component.authForm.get('confirmPassword');
    expect(confirmPassword).toBeInstanceOf(AbstractControl);
  });

  it('should output valid login data', () => {
    const loginDto: UserLoginDto = {
      nickname: 'test user',
      password: 'HardPassword123',
    };

    component.authForm.get('nickname')?.setValue(loginDto.nickname);
    component.authForm.get('password')?.setValue(loginDto.password);

    let result = {};

    component.onSubmit.subscribe((data) => {
      return (result = data);
    });
    component.submitForm();
    expect(result).toEqual(loginDto);
  });

  it('should not output invalid login data', () => {
    const loginDto: UserLoginDto = {
      nickname: 'test user',
      password: 'weakpasswrd',
    };

    component.authForm.get('nickname')?.setValue(loginDto.nickname);
    component.authForm.get('password')?.setValue(loginDto.password);

    let result = null;

    component.onSubmit.pipe(first()).subscribe((data) => {
      result = data;
    });

    component.submitForm();
    expect(result).toBeNull();
  });
});
