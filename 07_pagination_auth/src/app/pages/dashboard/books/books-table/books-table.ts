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
    if (this.payload()) {
      const total = this.payload()!.total_pages;
      const page = this.payload()!.page;
      const result = [];

      for (let p = 1; p <= total; p++) {
        result.push(p);
      }
      return result;
    }

    // 1   -> 1 2 3 4 5 6 ... last
    // 5   -> 1 .. 3 4 5 6 7 ... last

    return [1];
  }

  // getPages() {
  //   if (this.payload()) {
  //     const total = this.payload()!.total_pages;
  //     const page = this.payload()!.page;
  //     let result = [1];
  //     const left = [];
  //     const right = [];

  //     for(let i = page; i >= page - 3; i--)
  //     {
  //       if(i == 1 || i == total) {
  //         continue;
  //       }
  //       if(i == 1) {
  //         break;
  //       }
  //       else if(i == page - 3 && i > 1) {
  //         left.push(-1);
  //       } else {
  //         left.push(i);
  //       }
  //     }

  //     result = result.concat(left.reverse());

  //     for(let i = page + 1; i < page + 3; i++)
  //     {
  //       if(i == 1 || i == total) {
  //         continue;
  //       }
  //       if(i == total) {
  //         break;
  //       }
  //       else if(i == page + 3 && i < total) {
  //         right.push(-1);
  //       } else {
  //         right.push(i);
  //       }
  //     }

  //     result = result.concat(right);

  //     result.push(total)
  //     return result;
  //   }

  //   // 1   -> 1 2 3 4 5 6 ... last
  //   // 5   -> 1 .. 3 4 5 6 7 ... last

  //   return [1];
  // }

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
