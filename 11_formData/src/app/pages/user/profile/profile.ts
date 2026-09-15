import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { CookieService } from '../../../services/cookie/cookie-service';
import { Router } from '@angular/router';
import { User } from '../../../services/types';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  user = signal<User | null>(null);

  ngOnInit(): void {
    const token = this.cookieService.get('ujt');
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    

    this.authService.getUser(token).subscribe({
      next: (data) => { this.user.set(data.payload); },
      error: (error) => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
    });
  }
}
