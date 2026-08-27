import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Book, ListPayload } from '../types';

@Service()
export class BooksService {
    private httpClient = inject(HttpClient);
    private apiUrl = `https://frontend53.somee.com/api/books`;

    // Get books
    getBooks() {
        return this.httpClient.get<ApiResponse<ListPayload<Book>>>(this.apiUrl + '?page_size=200');
    }

    // POST book
    createBook(data: Book) {
        return this.httpClient.post<ApiResponse<Book>>(this.apiUrl, data);
    }
}
