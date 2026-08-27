import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../../../services/types';
import { BooksService } from '../../../../services/books/books-service';
import { AuthorsService } from '../../../../services/authors/authors-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule],
  templateUrl: './book-create.html',
  styleUrl: './book-create.css',
})
export class BookCreate implements OnInit {
  private booksService = inject(BooksService);
  private authorsService = inject(AuthorsService);
  private router = inject(Router);

  createForm: FormGroup;
  authors = signal<Author[]>([]);

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      image: [''],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      price: [0, [Validators.min(0)]],
      numberOfPages: [0, [Validators.min(0)]],
      publishDate: [2026, [Validators.min(0)]],
      authorId: [0]
    });
  }
  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe((data) => {
      this.authors.set(data.payload.items);
    });
  }

  handleSubmit() {
    if(this.createForm.valid) {
      this.booksService.createBook(this.createForm.value).subscribe({
        next: () => { this.router.navigate(['/books']) },
        error: (error) => { console.log(error) }
      });
    } else {
      this.createForm.markAllAsTouched();
    }
  }
}