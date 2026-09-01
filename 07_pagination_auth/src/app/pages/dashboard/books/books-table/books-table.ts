import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksService } from '../../../../services/books/books-service';
import { Book, ListPayload } from '../../../../services/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-table',
  imports: [RouterLink],
  templateUrl: './books-table.html',
  styleUrl: './books-table.css',
})
export class BooksTable implements OnInit {
  private booksService = inject(BooksService);

  payload = signal<ListPayload<Book> | null>(null);

  ngOnInit(): void {
    this.booksService.getBooks(4).subscribe((data) => {
      this.payload.set(data.payload);
    });
  }

  imageErrorHandle(event: ErrorEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '/images/bookDefault.png';
  }

  getPages() {
    if(this.payload()) {
      const result = [];
      for (let i = 1; i <= this.payload()?.total_pages!; i++) {
        result.push(i)
      }
      return result;
    } 

    return [1];
  }

  getRange() {
    if (!this.payload()) {
      return {
        start: 1,
        end: 20,
      };
    }

    const start = (this.payload()?.page! - 1) * this.payload()?.page_size! + 1;
    const end = start + this.payload()?.page_size! - 1;

    return {
      start: start,
      end: end < this.payload()?.total_items! ? end : this.payload()?.total_items!
    }
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id.toString()).subscribe((data) => {
      this.payload.update((current) => {
        if (current) {
          return { ...current, items: current.items.filter((b) => b.id != id) };
        } else {
          return null;
        }
      });
    });
  }
}
