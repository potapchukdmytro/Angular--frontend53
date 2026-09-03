import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, JwtPayload, Login } from '../types';
import { jwtDecode } from 'jwt-decode';

@Service()
export class AuthService {
    private httpClient = inject(HttpClient);
    private baseUrl = 'https://frontend53.somee.com/api/auth/';

    isAuth = signal(false);

    constructor() {
        const token = localStorage.getItem('jwt');
        token ? this.isAuth.set(true) : this.isAuth.set(false);
    }

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

    getLocalUser() {
        const token = localStorage.getItem('jwt');
        if(!token) {
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
        if(user) {
            return user.role == "admin";
        }

        return false;
    }
}
