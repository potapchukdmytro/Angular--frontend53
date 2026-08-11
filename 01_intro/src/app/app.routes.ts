import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Movie } from './pages/movie/movie';
import { MusicBand } from './pages/music-band/music-band';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'movie', component: Movie },
    { path: 'band', component: MusicBand }
];
