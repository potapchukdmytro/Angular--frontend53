import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { ApiResponse, ListPayload, User } from '../types';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';

@Service()
export class UsersService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);
  private apiUrl = 'https://frontend53.somee.com/api/user';

  user = signal<User | null>(null);

  imagesUrl = 'https://frontend53.somee.com/images/users/';

  getUsers(page: number | string = 1) {
    return this.httpClient.get<ApiResponse<ListPayload<User>>>(`${this.apiUrl}?page=${page}`);
  }

  confirmEmail(userId: number | string) {
    return this.httpClient.patch<ApiResponse<null>>(this.apiUrl + '/confrimEmail', {
      userId: userId,
    });
  }

  setAvatar(data: FormData) {
    return this.httpClient.patch<ApiResponse<string>>(this.apiUrl + '/avatar', data);
  }

  setCountry(userId: string | number, country: string) {
    return this.httpClient.patch<ApiResponse<string>>(this.apiUrl + '/country', {
      userId: userId,
      country: country,
    });
  }

  loadUser(token: string) {
    this.authService.getUser(token).subscribe({
      next: (data) => {
        this.user.set(data.payload);
      },
      error: (error) => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
    });
  }

  setBirthDate(userId: string | number, birthDate: string) {
    return this.httpClient.patch<ApiResponse<string>>(this.apiUrl + '/birthDate', {
      userId: userId,
      birthDate: birthDate,
    });
  }

  setUserName(userId: string | number, userName: string) {
    return this.httpClient.patch<ApiResponse<string>>(this.apiUrl + '/changeUserName', {
      userId: userId,
      userName: userName,
    });
  }
}
