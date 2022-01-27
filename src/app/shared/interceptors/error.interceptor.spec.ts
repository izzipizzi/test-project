import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsService } from '../../posts/services/posts.service';
import { throwError } from 'rxjs';
import { ErrorInterceptor } from './error.interceptor';

describe(`ErrorInterceptor`, () => {
  let service: PostsService;
  let httpRequestSpy;
  let httpHandlerSpy;
  const error = { status: 401, statusText: 'error' };

  let errorInterceptor: ErrorInterceptor;
  let authenticationServiceSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        PostsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logout']);
    errorInterceptor = await new ErrorInterceptor(authenticationServiceSpy);
  });

  it('should be created', async () => {
    await expect(errorInterceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError({ error: { message: 'test-error' } }));
    //act
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual('test-error');
      }
    );
  });
});
