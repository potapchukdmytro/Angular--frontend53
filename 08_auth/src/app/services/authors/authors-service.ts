import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, Author, ListPayload } from '../types';

@Service()
export class AuthorsService {
    private httpClient = inject(HttpClient);
    private apiUrl = 'https://frontend53.somee.com/api/authors';

    // Get Authors
    getAuthors() {
        return this.httpClient.get<ApiResponse<ListPayload<Author>>>(this.apiUrl);
    }
}
