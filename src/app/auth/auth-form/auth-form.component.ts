import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nicknameValidation, passwordValidation, UserLoginDto } from 'shared';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() isSignUp: boolean = false;
  authForm: FormGroup;

  private readonly validationErrors = {
    nickname: new Map<string, string>([
      ['required', 'Please enter nickname.'],
      ['minlength', `The nickname must be longer than ${nicknameValidation.minLength} characters.`],
      ['maxlength', `The nickname must be no longer than ${nicknameValidation.maxlength} characters.`],
    ]),
    password: new Map<string, string>([
      ['required', 'Please enter password.'],
      ['minLength', `The password must be longer than ${passwordValidation.minLength} characters.`],
      ['maxlength', `The password must be no longer than ${passwordValidation.maxlength} characters.`],
      ['pattern', `The password must contain at least 1 uppercase, 1 lowercase and 1 number`],
    ]),
    confirmPassword: new Map<string, string>([
      ['equal', 'This password does not match that entered in the password field, please try again. '],
      ['minLength', `The password must be longer than ${passwordValidation.minLength} characters.`],
      ['maxlength', `The password must be no longer than ${passwordValidation.maxlength} characters.`],
      ['pattern', `The password must contain at least 1 uppercase, 1 lowercase and 1 number`],
    ]),
  };

  @Output() onSubmit = new EventEmitter<UserLoginDto>();

  constructor(private readonly formBuilder: FormBuilder) {
    this.authForm = formBuilder.group({
      nickname: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(nicknameValidation.minLength),
        Validators.maxLength(nicknameValidation.maxlength),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(passwordValidation.minLength),
        Validators.maxLength(passwordValidation.maxlength),
        Validators.pattern(passwordValidation.passwordRegExp),
      ]),
    });
  }

  ngOnInit(): void {
    if (this.isSignUp) {
      this.authForm.addControl(
        'confirmPassword',
        this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(passwordValidation.minLength),
          Validators.maxLength(passwordValidation.maxlength),
          Validators.pattern(passwordValidation.passwordRegExp),
        ])
      );
      this.authForm.addValidators(comparePasswords);
    }
  }

  submitForm() {
    if (this.formValid) {
      const loginDto: UserLoginDto = {
        nickname: this.authForm.get('nickname')?.value,
        password: this.authForm.get('password')?.value,
      };
      this.onSubmit.emit(loginDto);
      this.resetForm();
    } else return;
  }

  get nicknameError(): string {
    const formControl = this.authForm.get('nickname');
    for (let errorsKey in formControl?.errors) {
      if (this.validationErrors?.nickname.has(errorsKey)) {
        return <string>this.validationErrors?.nickname?.get(errorsKey);
      }
    }
    return '';
  }

  get passwordError(): string {
    const formControl = this.authForm.get('password');
    for (let errorsKey in formControl?.errors) {
      if (this.validationErrors?.password.has(errorsKey)) {
        return <string>this.validationErrors?.password?.get(errorsKey);
      }
    }

    return '';
  }

  get confirmPasswordError(): string {
    const formControl = this.authForm.get('confirmPassword');
    for (let errorsKey in formControl?.errors) {
      if (this.validationErrors?.confirmPassword.has(errorsKey)) {
        return <string>this.validationErrors?.confirmPassword?.get(errorsKey);
      }
    }

    return '';
  }

  resetForm(): void {
    this.authForm.reset();
  }

  get formValid(): boolean {
    return this.authForm.valid;
  }
}

export function comparePasswords(c: AbstractControl) {
  if (c.get('password')?.valid && c.get('password')?.value === c.get('confirmPassword')?.value) {
    return null;
  } else {
    c.get('confirmPassword')?.setErrors({ equal: false });
    return {
      equal: false,
    };
  }
}
