import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Movie } from './pages/movie/movie';
import { MusicBand } from './pages/music-band/music-band';
import { Pipes } from './pages/pipes/pipes';
import { Counter } from './pages/counter/counter';
import { Timer } from './pages/timer/timer';
import { BookList } from './pages/books/book-list/book-list';
import { BookCreate } from './pages/dashboard/books/book-create/book-create';
import { Dashboard } from './pages/dashboard/dashboard/dashboard';
import { BooksTable } from './pages/dashboard/books/books-table/books-table';
import { BookUpdate } from './pages/dashboard/books/book-update/book-update';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'movie', component: Movie },
    { path: 'band', component: MusicBand },
    { path: 'pipes', component: Pipes },
    { path: 'counter', component: Counter },
    { path: 'stopwatch', component: Timer },
    { path: 'books', component: BookList },
    { 
        path: 'dashboard',
        component: Dashboard,
        children: [
            { path: "books", component: BooksTable },
            { path: "books/create", component: BookCreate },
            { path: "books/update/:id", component: BookUpdate }
        ]
    }
];
