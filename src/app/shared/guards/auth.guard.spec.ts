import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserResponseDto, UserRole } from 'shared';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { API } from '../api-routes';

let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

@Component({
  template: '<router-outlet></router-outlet>',
})
class RoutingComponent {}

@Component({
  template: '',
})
class DummyComponent {}

describe('Auth Guard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  let dummyUser: UserResponseDto = {
    _id: '61e9275f22297919aefb44fb',
    nickname: 'Petr5',
    role: UserRole.REGULAR,
    avatar: '',
    token: 'some token',
  };

  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([{ path: 'add-post', component: DummyComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [DummyComponent, RoutingComponent],
      providers: [
        AuthGuard,
        AuthService,
        { provide: Router, useValue: router },
        { provide: RouterStateSnapshot, useValue: mockSnapshot },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    authGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    authService.signIn({ nickname: 'Petr5', password: 'password' }).subscribe((data) => {});
    const request = httpMock.expectOne(API.signIn());
    request.flush(dummyUser);
  });

  it('be able to hit route when user is logged in', (done: DoneFn) => {
    expect(authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(true);
    done();
  });

  it('should Redirect to login page', function () {
    authService.logout();
    expect(authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(false);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
