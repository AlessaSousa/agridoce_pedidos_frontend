import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { IUserRegister } from '../models/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  public isLogged = signal(!!localStorage.getItem('isLogged'));
  public emailUser = signal('');


  constructor() { }
  login(credentials: { email: string; senha: string }) {
    return lastValueFrom(
      this.http.post(`${environment.apiURL}/api/auth/login`, credentials, {
        withCredentials: true,
        responseType: 'text'
      })
    ).then(res => {
      localStorage.setItem('isLogged', 'true');
      this.isLogged.set(true);
      const limpa = res.replace(/\s*signed in/, "");
      this.emailUser.set(limpa)
      return res;
    });
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
    return lastValueFrom(
      this.http.post(`${environment.apiURL}/api/auth/logout`, {}, {
        withCredentials: true,
        responseType: 'text'
      })
    ).then(res => {
      localStorage.removeItem('isLogged');
      this.isLogged.set(false);
      return res;
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLogged') === 'true';
  }
}
