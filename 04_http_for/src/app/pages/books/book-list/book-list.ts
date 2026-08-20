import { Component, OnInit, inject, signal } from '@angular/core';
import { BooksService } from '../../../services/books/books-service';
import { Book } from '../../../services/types';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  private booksService = inject(BooksService);

  books = signal<Book[]>([]);

  // Спрацює тільки при першому малюванні компонента
  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books.set(data.payload.items);
      console.log(data);
    });
  }
}