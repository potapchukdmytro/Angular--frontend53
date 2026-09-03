import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Login } from '../types';

@Service()
export class AuthService {
    private httpClient = inject(HttpClient);
    private baseUrl = 'https://frontend53.somee.com/api/auth/';

    isAuth = signal(false);

    loginRequest(data: Login) {
        return this.httpClient.post<ApiResponse<string>>(this.baseUrl + 'login', data);
    }

    login(token: string) {
        this.isAuth.set(true);
        localStorage.setItem("jwt", token);
    }

    logout() {
        this.isAuth.set(false);
        localStorage.removeItem("jwt");
    }
}
