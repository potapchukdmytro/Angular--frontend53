import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Book, ListPayload } from '../types';

@Service()
export class BooksService {
    private httpClient = inject(HttpClient);
    private apiUrl = `https://frontend53.somee.com/api/books`;

    // GET books
    getBooks(page: number | string = 1) {
        return this.httpClient.get<ApiResponse<ListPayload<Book>>>(`${this.apiUrl}?page_size=20&page=${page}`);
    }

    // GET book by id
    getBook(id: string) {
        return this.httpClient.get<ApiResponse<Book>>(this.apiUrl + `/${id}`);
    }

    // POST book
    createBook(data: Book) {
        return this.httpClient.post<ApiResponse<Book>>(this.apiUrl, data);
    }

    // PUT book
    updateBook(data: Book) {
        return this.httpClient.put<ApiResponse<Book>>(this.apiUrl, data);
    }

    // DELETE book
    deleteBook(id: string) {
        return this.httpClient.delete<ApiResponse<Book>>(this.apiUrl + `/${id}`);
    }
}
