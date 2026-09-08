import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, ListPayload, User } from '../types';

@Service()
export class UsersService {
    private httpClient = inject(HttpClient);
    private apiUrl = "https://frontend53.somee.com/api/user";

    getUsers(page: number | string = 1) {
        return this.httpClient.get<ApiResponse<ListPayload<User>>>(`${this.apiUrl}?page=${page}`);
    }
}
