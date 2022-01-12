import { Component, OnInit } from '@angular/core';
import { UserLoginDto } from 'shared';
import { ToastService, ToastType } from '../../shared/services/toast.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private readonly spinnerService: SpinnerService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  signUpUser(loginDto: UserLoginDto) {
    this.spinnerService.show();

    this.authService.signUp(loginDto).subscribe(
      (data) => {
        this.spinnerService.hide();
        if (data.message) {
          this.toastService.notification$.next({ message: 'Success', type: ToastType.SUCCESS });
          this.router.navigate(['/auth/login']);
        }
      },
      (error) => {
        this.toastService.notification$.next({ message: error, type: ToastType.ERROR });
      }
    );
  }
}
