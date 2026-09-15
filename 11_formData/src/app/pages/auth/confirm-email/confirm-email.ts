import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterLink],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css',
})
export class ConfirmEmail implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const userId = params['userId'];

      if(!token || !userId) {
        this.router.navigate(['email/falied']);
      }

      this.authService.confirmEmailRequest(userId, token).subscribe({
        next: (data) => { this.loading.set(false); },
        error: (error) => { this.router.navigate(['email/falied']); }
      });
    })
  }
}
