import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { ApiResponse, ListPayload, User, UserPersonalData } from '../types';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { CookieService } from '../cookie/cookie-service';

@Service()
export class UsersService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
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

  logout() {
    this.authService.logout();
    this.user.set(null);
  }

  updateProfile(data: UserPersonalData) {
    return this.httpClient.patch<ApiResponse<User>>(this.apiUrl + '/profile', data);
  }

  changePassword(oldPassword: string, newPassword: string) {
    const token = this.cookieService.get('ujt');
    return this.httpClient.patch<ApiResponse<User>>(
      this.apiUrl + '/changePassword',
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          "Authorization": "Bearer " + token
        }
      },
    );
  }
}
