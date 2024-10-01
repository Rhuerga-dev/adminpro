import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  constructor(private http: HttpClient,
    private ngZone: NgZone,
    private router: Router) { }

  
 get token(): string {
    return localStorage.getItem('token') || '';
  }

  get email(): string {
    return localStorage.getItem('email') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } }
  }

  getHospitals() {
    return this.http.get<any>(`${base_url}/hospitals `, this.headers)
      .pipe(
        map((resp: {ok: boolean, hospitals: Hospital[]}) => resp.hospitals)
      );

  }
}
