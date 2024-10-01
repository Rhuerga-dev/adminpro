import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, NgZone, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { ChargeUser } from '../interfaces/charge-users.interface';

import { User } from '../models/user.model';


declare const google: any;

const base_url = environment.base_url;




@Injectable({
  providedIn: 'root'
})
export class UserService  {

  @ViewChild('googleBtn') googleBtn?: ElementRef;

  public auth2: any;
  public user!: User;

  constructor(private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get email(): string {
    return localStorage.getItem('email') || '';
  }
  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }


  

  logout() {

    google.accounts.id.revoke(this.email, () => {
      // Navegar al Dashboard
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    });
  }


  validateToken(): Observable<boolean> {

    google.accounts.id.initialize({
      client_id: "646991237896-urlup2se3iqo8tfo5gcerph1047cgdl6.apps.googleusercontent.com",
        
    });

    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
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

  updateProfile(data: { email: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.user.role!
    };

    return this.http.put(`${base_url}/users/${this.user?.uid}`, data, this.headers);
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

  uploadUser(indexOff: number, limit: number) {
    return this.http.get<ChargeUser>(`${base_url}/users?indexOff=${indexOff}&limit=${limit} `, this.headers)
      .pipe(
        //delay(5000),
        map(resp => {
          //console.log(resp);
          const users = resp.users.map(
            user => new User( user.name,user.email, '', user.img, user.google, user.role, user.uid ));
          return { totalIndex: resp.totalIndex, users };
        })
      );

  }

  deleteUser(user: User) {

    return this.http.delete(`${base_url}/users/${user.uid}`, this.headers);
  }

  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

}
