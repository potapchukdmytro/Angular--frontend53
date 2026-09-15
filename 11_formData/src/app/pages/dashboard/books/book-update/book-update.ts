import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../../../services/books/books-service';
import { AuthorsService } from '../../../../services/authors/authors-service';
import { Author } from '../../../../services/types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-update',
  imports: [ReactiveFormsModule],
  templateUrl: './book-update.html',
  styleUrl: './book-update.css',
})
export class BookUpdate implements OnInit {
  private booksService = inject(BooksService);
  private authorsService = inject(AuthorsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookId: string | null = null;

  updateForm: FormGroup;
  authors = signal<Author[]>([]);

  constructor(private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      image: [''],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      price: [0, [Validators.min(0)]],
      numberOfPages: [0, [Validators.min(0)]],
      publishDate: [2026, [Validators.min(0)]],
      authorId: [0],
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.loadBook(this.bookId);
    } else {
      this.router.navigate(['..']);
    }

    this.authorsService.getAuthors().subscribe((data) => {
      this.authors.set(data.payload.items);
    });
  }

  loadBook(id: string) {
    this.booksService.getBook(id).subscribe({
      next: ({ payload }) => {
        this.updateForm.patchValue({
          title: payload.title,
          description: payload.description,
          image: payload.image,
          rating: payload.rating,
          price: payload.price,
          numberOfPages: payload.number_of_pages,
          publishDate: payload.publish_date,
          authorId: payload.author ? payload.author.id : 0,
        });
      },
      error: () => {
        this.router.navigate(['/dashboard/books']);
      },
    });
  }

  handleSubmit() {
    if (this.updateForm.valid) {
      this.booksService.updateBook({...this.updateForm.value, id: this.bookId}).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/books']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.updateForm.markAllAsTouched();
    }
  }
}
