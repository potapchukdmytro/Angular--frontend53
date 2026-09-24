import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksService } from '../../../../services/books/books-service';
import { Book, ListPayload } from '../../../../services/types';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-table',
  imports: [RouterLink],
  templateUrl: './books-table.html',
  styleUrl: './books-table.css',
})
export class BooksTable implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private booksService = inject(BooksService);

  payload = signal<ListPayload<Book> | null>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'];
      this.loadBooks(page);
    });
  }

  imageErrorHandle(event: ErrorEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '/images/bookDefault.png';
  }

  loadBooks(page: string | number = 1) {
    this.booksService.getBooks(page).subscribe((data) => {
      this.payload.set(data.payload);
    });
  }

  pageClick(page: string | number = 1) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
    this.loadBooks(page);
  }

  nextPageClick() {
    if(this.payload()!.page < this.payload()?.total_pages!) {
      this.pageClick(this.payload()!.page + 1);
    }
  }

  prevPageClick() {
    if(this.payload()!.page > 1) {
      this.pageClick(this.payload()!.page - 1);
    }
  }

  getPages() {
    if(!this.payload()) {
      return [1];
    }
      const total = this.payload()!.total_pages;
      const page = this.payload()!.page;

      if(total <= 7) {
        const result = [];
        for (let i = 1; i <= total; i++) {
          result.push(i);
        }
        return result;
      }

      if(page <= 4) {
        return [1, 2, 3, 4, 5, 6, -1, total]
      }

      if(page >= total - 3) {
        return [1, -1, total - 5, total - 4, total - 3, total - 2, total - 1, total]
      }

      return [1, -1, page -2 , page - 1, page, page + 1, page + 2, -1, total]
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
      end: end < this.payload()?.total_items! ? end : this.payload()?.total_items!,
    };
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
