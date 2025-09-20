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

  login(credentials: { email: string; senha: string }) {
    return this.http.post<{ token: string }>(`${environment.apiURL}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  register(data: IUserRegister) {
    return this.http.post(`${environment.apiURL}/register`, data)
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
