import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, JwtPayload, Login } from '../types';
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

    login(token: string) {
        this.isAuth.set(true);
        try {
            const decodedToken = jwtDecode(token);
            const tokenExp = decodedToken.exp;
            if(tokenExp) {
                this.cookieService.setUnix('ujt', token, tokenExp);
            }
            
        } catch (error) {
            
        }
    }

    logout() {
        this.isAuth.set(false);
        this.cookieService.remove('ujt');
    }

    getLocalUser() {
        const token = this.cookieService.get('ujt');
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
