import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, JwtPayload, Login, Register, User } from '../types';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from '../cookie/cookie-service';

@Service()
export class AuthService {
  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);
  private baseUrl = 'https://frontend53.somee.com/api/auth/';

  isAuth = signal(false);

  constructor() {
    const token = this.cookieService.get('ujt');
    token ? this.isAuth.set(true) : this.isAuth.set(false);
  }

  loginRequest(data: Login) {
    return this.httpClient.post<ApiResponse<string>>(this.baseUrl + 'login', data);
  }

  registerRequest(data: Register) {
    return this.httpClient.post<ApiResponse<string>>(
      this.baseUrl + 'register?callbackUrl=http://localhost:4200/email/confirm',
      data,
    );
  }

  confirmEmailRequest(userId: string, token: string) {
    return this.httpClient.get<ApiResponse<null>>(
      this.baseUrl + `confirmEmail?token=${token}&userId=${userId}`,
    );
  }

  getUser(token: string) {
    const json = JSON.stringify(token);
    return this.httpClient.post<ApiResponse<User>>(this.baseUrl + 'me', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  login(token: string) {
    this.isAuth.set(true);
    try {
      const decodedToken = jwtDecode(token);
      const tokenExp = decodedToken.exp;
      if (tokenExp) {
        this.cookieService.setUnix('ujt', token, tokenExp);
      }
    } catch (error) {}
  }

  logout() {
    this.isAuth.set(false);
    this.cookieService.remove('ujt');
  }

  getLocalUser() {
    const token = this.cookieService.get('ujt');
    if (!token) {
      return null;
    }

    try {
      const user = jwtDecode<JwtPayload>(token);
      return user;
    } catch (error) {
      return null;
    }
  }

  isAdmin() {
    const user = this.getLocalUser();
    if (user) {
      return user.role == 'admin';
    }

    return false;
  }
}
