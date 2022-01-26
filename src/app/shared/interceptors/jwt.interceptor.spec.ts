import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { PostsService } from '../../posts/services/posts.service';
import { Post, UserResponseDto, UserRole } from 'shared';
import { API } from '../api-routes';
import { AuthService } from '../services/auth.service';

describe(`JWTInterceptor`, () => {
  let service: PostsService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  let dummyPost: Post = {
    _id: '1234',
    comments: [],
    dateCreated: new Date(),
    likes: [],
    tags: [],
    text: '',
    title: '',
  };

  let dummyUser: UserResponseDto = {
    _id: '61e9275f22297919aefb44fb',
    nickname: 'Petr5',
    role: UserRole.REGULAR,
    avatar: '',
    token: 'some token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(PostsService);
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    authService.signIn({ nickname: 'Petr5', password: 'password' }).subscribe((data) => {});
    const request = httpMock.expectOne(API.signIn());
    request.flush(dummyUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    service.getPostById('1234').subscribe((response) => {
      expect(response).toEqual(dummyPost);
    });

    const request = httpMock.expectOne(API.getPostById('1234'));
    expect(request.request.headers.has('x-access-token')).toEqual(true);
    request.flush(dummyPost);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
