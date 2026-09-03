import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Count } from '../../services/count';
import { Currency } from '../../services/currency';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService);
  counter = inject(Count);
  currency = inject(Currency);
}
