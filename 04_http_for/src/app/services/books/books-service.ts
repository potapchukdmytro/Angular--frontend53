import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Book } from '../types';

@Service()
export class BooksService {
    private httpClient = inject(HttpClient);
    private apiUrl = `https://frontend53.somee.com/api/books`;

    // Get books
    getBooks() {
        return this.httpClient.get<ApiResponse<Book>>(this.apiUrl);
    }
}
