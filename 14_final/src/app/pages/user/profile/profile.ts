import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { CookieService } from '../../../services/cookie/cookie-service';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { User } from '../../../services/types';
import { UsersService } from '../../../services/users/users-service';
import { ToastrService } from '@openng/ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  
  usersService = inject(UsersService);

  ngOnInit(): void {
    const token = this.cookieService.get('ujt');
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    
    this.usersService.loadUser(token);
  }

  imageSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length > 0) {
      const file = input.files[0];
      const userId = this.usersService.user()!.id;

      const formData = new FormData();
      formData.append("userId", userId.toString());
      formData.append("image", file);

      this.usersService.setAvatar(formData).subscribe({
        next: (data) => {
          this.toastr.success(data.message, "Зображення профілю");
          this.usersService.user.update((prev) => {
            return prev ? {...prev, image: data.payload } : prev;
          })
        }
      });
    }
  }

  logoutHandler() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
