import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ServerResponse, UserLoginDto, UserResponseDto } from 'shared';
import { API } from '../api-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserResponseDto | null>;
  public currentUser: Observable<UserResponseDto | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserResponseDto | null>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserResponseDto | null {
    return this.currentUserSubject.value;
  }

  signIn(loginDto: UserLoginDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(API.signIn(), loginDto).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  signUp(loginDto: UserLoginDto): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(API.signUp(), loginDto);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
