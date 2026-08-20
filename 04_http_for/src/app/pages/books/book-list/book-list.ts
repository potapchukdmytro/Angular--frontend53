import { Component, OnInit, inject, signal } from '@angular/core';
import { BooksService } from '../../../services/books/books-service';
import { Book } from '../../../services/types';
import { HryvniaPipe } from '../../../pipes/hryvnia-pipe';

@Component({
  selector: 'app-book-list',
  imports: [HryvniaPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  private booksService = inject(BooksService);

  public books = signal<Book[]>([]);

  // Спрацює тільки при першому малюванні компонента
  public ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books.set(data.payload.items);
    });
  }

  public imageErrorHandle(event: ErrorEvent) {
    const img = event.target as HTMLImageElement;
    img.src = "/images/bookDefault.png";
  }
}