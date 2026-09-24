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
import { UsersTable } from './pages/dashboard/users/users-table/users-table';
import { Register } from './pages/auth/register/register';
import { ConfirmEmail } from './pages/auth/confirm-email/confirm-email';
import { ConfirmEmailFailed } from './pages/auth/confirm-email-failed/confirm-email-failed';
import { Personal } from './pages/user/personal/personal';
import { Favorites } from './pages/user/favorites/favorites';
import { Reviewed } from './pages/user/reviewed/reviewed';
import { Settings } from './pages/user/settings/settings';

export const routes: Routes = [
  // Main pages
  { path: '', component: Home, title: "Домашня сторінка" },
  { path: 'movie', component: Movie, title: "Фільм - одісея" },
  { path: 'band', component: MusicBand, title: "Гурт Скрябін" },
  { path: 'pipes', component: Pipes },
  { path: 'counter', component: Counter },
  { path: 'stopwatch', component: Timer },
  { path: 'books', component: BookList, title: "Каталог книг" },

  // Authorization
  { path: 'login', component: Login, title: "Вхід" },
  { path: 'register', component: Register, title: "Реєстрація" },

  // Email
  { path: 'email/confirm', component: ConfirmEmail, title: "Підтвердження пошти" },
  { path: 'email/falied', component: ConfirmEmailFailed, title: "Підтвердження пошти" },

  // Profile
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
    children: [
      { path: '', component: Personal, title: "Профіль" },
      { path: 'favorites', component: Favorites, title: "Профіль - Улюблене" },
      { path: 'reviewed', component: Reviewed, title: "Профіль - Переглянуті" },
      { path: 'settings', component: Settings, title: "Профіль - Налаштування" },
    ],
  },

  // Dashboard
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [adminRoleGuard],
    title: "Панель керування",
    children: [
      { path: 'books', component: BooksTable, title: "Список книг" },
      { path: 'books/create', component: BookCreate, title: "Нова книга" },
      { path: 'books/update/:id', component: BookUpdate },
      { path: 'users', component: UsersTable, title: "Список користувачів" },
    ],
  },
];
