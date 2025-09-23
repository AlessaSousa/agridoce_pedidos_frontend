import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { IUserRegister } from '../models/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }

  // login(credentials: { email: string; senha: string }) {
  //   return lastValueFrom(this.http.post<{ token: string }>(`${environment.apiURL}/api/auth/login`, credentials)
  //     .pipe(
  //       tap(res => {
  //         console.log('Resposta do login:', res);
  //         localStorage.setItem('token', res.token);
  //       })
  //     ));
  // }

  login(credentials: { email: string; senha: string }) {
    return lastValueFrom(
      this.http.post(`${environment.apiURL}/api/auth/login`, credentials, {
        withCredentials: true,
        responseType: 'text'
      })
    );
  }

  register(data: IUserRegister) {
    return lastValueFrom(
      this.http.post(`${environment.apiURL}/api/auth/register`, data, {
        withCredentials: true,
        responseType: 'text'
      })
    );
  }


  logout() {
    localStorage.removeItem('token')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
