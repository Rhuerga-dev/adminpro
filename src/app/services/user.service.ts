import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


declare const google: any;

const base_url = environment.base_url;
let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) {}



  logout() {
    localStorage.removeItem('token');

    const email = localStorage.getItem('email');
    google.accounts.id.revoke(email, () => {

      localStorage.removeItem('email');

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    })
  }


  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      // El of reorna un nuevo Obsevable
      catchError(error => of(false))
    );

  }

  createUser(formData: RegisterForm) {

    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
          localStorage.setItem('email', resp.email)
        })
      );
  }
}
