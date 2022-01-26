import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API } from '../api-routes';
import { UserResponseDto, UserRole } from 'shared';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  let dummyUser: UserResponseDto = {
    _id: '61e9275f22297919aefb44fb',
    nickname: 'Petr5',
    role: UserRole.REGULAR,
    avatar: '',
    token: 'some token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    service.logout();
    expect(service.currentUserValue).toBeNull();
    expect(JSON.parse(localStorage.getItem('currentUser') as string)).toBeNull();
  });

  it('should signIn', (done: DoneFn) => {
    service.signIn({ nickname: 'Petr5', password: 'password' }).subscribe((data) => {
      expect(data).toEqual(dummyUser);
      expect(service.currentUserValue).toEqual(dummyUser);
      expect(JSON.parse(localStorage.getItem('currentUser') as string)).toEqual(dummyUser);
      done();
    });

    const request = httpMock.expectOne(API.signIn());
    expect(request.request.method).toBe('POST');
    request.flush(dummyUser);
  });

  it('should signUp', (done: DoneFn) => {
    service.signUp({ nickname: 'Petr5', password: 'password' }).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });

    const request = httpMock.expectOne(API.signUp());
    expect(request.request.method).toBe('POST');
    request.flush(dummyUser);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
