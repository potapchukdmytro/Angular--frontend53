import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksService } from '../../../../services/books/books-service';
import { Book } from '../../../../services/types';

@Component({
  selector: 'app-books-table',
  imports: [],
  templateUrl: './books-table.html',
  styleUrl: './books-table.css',
})
export class BooksTable implements OnInit {
  private booksService = inject(BooksService);

  books = signal<Book[]>([]);

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books.set(data.payload.items);
    });
  }

  imageErrorHandle(event: ErrorEvent) {
    const img = event.target as HTMLImageElement;
    img.src = "/images/bookDefault.png";
  }
}
