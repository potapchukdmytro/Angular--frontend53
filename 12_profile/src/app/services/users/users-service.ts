import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, ListPayload, User } from '../types';

@Service()
export class UsersService {
    private httpClient = inject(HttpClient);
    private apiUrl = "https://frontend53.somee.com/api/user";

    imagesUrl = "https://frontend53.somee.com/images/users/";

    getUsers(page: number | string = 1) {
        return this.httpClient.get<ApiResponse<ListPayload<User>>>(`${this.apiUrl}?page=${page}`);
    }

    confirmEmail(userId: number | string) {
        return this.httpClient.patch<ApiResponse<null>>(this.apiUrl + "/confrimEmail", { userId: userId });
    }

    setAvatar(data: FormData) {
        return this.httpClient.patch<ApiResponse<string>>(this.apiUrl + "/avatar", data);
    }
}
