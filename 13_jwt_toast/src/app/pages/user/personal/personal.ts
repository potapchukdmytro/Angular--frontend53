import { Component, inject, Signal, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { BirthDatePipe } from '../../../pipes/birth-date-pipe';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users/users-service';
import { DateService } from '../../../services/date/date-service';

@Component({
  selector: 'app-personal',
  imports: [BirthDatePipe, FormsModule],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {
  userService = inject(UsersService);
  authService = inject(AuthService);
  dateService = inject(DateService);
  isEditable = signal(false);

  // inputs
  country = this.userService.user()!.country;
  userName = this.userService.user()!.userName;
  birthDate: string = this.dateService.ISOToISODate(this.userService.user()!.birthDate);

  switchEditable() {
    this.isEditable.update((prev) => !prev);
  }

  saveChanges() {
    // country
    if (this.userService.user()!.country != this.country) {
      this.userService.setCountry(this.userService.user()!.id, this.country).subscribe({
        next: (data) => {
          this.isEditable.set(false);
          this.userService.user.update((prev) =>
            prev ? { ...prev, country: data.payload } : prev,
          );
        },
        error: () => {
          this.isEditable.set(false);
        },
      });
    }

    // userName
    if (this.userService.user()!.userName != this.userName) {
      this.userService.setUserName(this.userService.user()!.id, this.userName).subscribe({
        next: (data) => {
          this.isEditable.set(false);
          this.userService.user.update((prev) =>
            prev ? { ...prev, userName: data.payload } : prev,
          );
        },
        error: () => {
          this.isEditable.set(false);
        },
      });
    }

    // birthDate
    if (this.dateService.ISOToISODate(this.userService.user()!.birthDate) != this.birthDate) {
      this.userService.setBirthDate(this.userService.user()!.id, this.birthDate).subscribe({
        next: (data) => {
          this.isEditable.set(false);
          this.userService.user.update((prev) =>
            prev ? { ...prev, birthDate: data.payload } : prev,
          );
        },
        error: () => {
          this.isEditable.set(false);
        },
      });
    }
  }

  sendEmailConfirm() {
    this.authService
      .sendConfirmEmail(this.userService.user()!.id, 'http://localhost:4200/email/confirm')
      .subscribe(() => {
        alert('Лист відправлено');
      });
  }
}
