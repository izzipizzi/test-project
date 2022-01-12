import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserResponseDto } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: UserResponseDto | null = null;

  @Input('title') title: string = '';

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  get userName(): string {
    return <string>this.authService.currentUserValue?.nickname;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
