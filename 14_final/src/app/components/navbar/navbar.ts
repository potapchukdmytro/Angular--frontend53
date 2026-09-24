import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Count } from '../../services/count';
import { Currency } from '../../services/currency';
import { AuthService } from '../../services/auth/auth-service';
import { UsersService } from '../../services/users/users-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);

  authService = inject(AuthService);
  usersService = inject(UsersService);
  counter = inject(Count);
  currency = inject(Currency);

  logoutHandler() {
    this.usersService.logout();
    this.router.navigate(['/']);
  }
}
