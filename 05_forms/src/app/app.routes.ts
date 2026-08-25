import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Movie } from './pages/movie/movie';
import { MusicBand } from './pages/music-band/music-band';
import { Pipes } from './pages/pipes/pipes';
import { Counter } from './pages/counter/counter';
import { Timer } from './pages/timer/timer';
import { BookList } from './pages/books/book-list/book-list';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'movie', component: Movie },
    { path: 'band', component: MusicBand },
    { path: 'pipes', component: Pipes },
    { path: 'counter', component: Counter },
    { path: "stopwatch", component: Timer },
    { path: "books", component: BookList }
];
