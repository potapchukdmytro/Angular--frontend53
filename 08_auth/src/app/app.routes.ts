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
import { Login } from './pages/auth/login/login';
import { Profile } from './pages/user/profile/profile';
import { authGuard } from './core/guards/auth-guard';
import { adminRoleGuard } from './core/guards/admin-role-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'movie', component: Movie },
    { path: 'band', component: MusicBand },
    { path: 'pipes', component: Pipes },
    { path: 'counter', component: Counter },
    { path: 'stopwatch', component: Timer },
    { path: 'books', component: BookList },
    { path: 'login', component: Login },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { 
        path: 'dashboard',
        component: Dashboard,
        canActivate: [adminRoleGuard],
        children: [
            { path: "books", component: BooksTable },
            { path: "books/create", component: BookCreate },
            { path: "books/update/:id", component: BookUpdate }
        ]
    }
];
