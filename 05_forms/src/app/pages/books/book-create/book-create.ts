import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../../../services/types';
import { BooksService } from '../../../services/books/books-service';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule],
  templateUrl: './book-create.html',
  styleUrl: './book-create.css',
})
export class BookCreate {
  private booksService = inject(BooksService);
  createForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
      rating: [0],
      price: [0],
      numberOfPages: [0],
      publishDate: [2026]
    });
  }

  handleSubmit() {
    const data: Book = this.createForm.value;

    this.booksService.createBook(data).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}