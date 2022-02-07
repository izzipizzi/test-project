import { Component, OnInit } from '@angular/core';
import { UserLoginDto } from 'shared';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService, ToastType } from '../../shared/services/toast.service';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signInUser(loginDto: UserLoginDto) {
    this.spinnerService.show();

    this.authService.signIn(loginDto).subscribe(
      (data) => {
        this.spinnerService.hide();
        if (data._id) {
          this.toastService.notification$.next({ message: 'Success', type: ToastType.SUCCESS });
          this.router.navigate([this.returnUrl]);
        }
      },
      (error) => {
        this.toastService.notification$.next({ message: error, type: ToastType.ERROR });
      }
    );
  }
}
