import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


declare const google: any;

const base_url = environment.base_url;




@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user!: User;

  constructor(private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  logout() {
    const email = localStorage.getItem('email') || '';

    google.accounts.id.revoke(email, () => {
      // Navegar al Dashboard
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    });
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const {
          email, google, name, img = '', role, uid } = resp.user;

        this.user = new User(name, email, '', img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      // El of retorna un nuevo Obsevable
      catchError(_error => of(false))
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

  updateProfile(data: { email: string, name: string, role?: string }) {

    data = {
      ...data,
      role: this.user.role
    };

    return this.http.put(`${base_url}/users/${this.user?.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
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
          //console.log(resp);
          localStorage.setItem('token', resp.token)
          localStorage.setItem('email', resp.email)
        })
      );
  }
}
