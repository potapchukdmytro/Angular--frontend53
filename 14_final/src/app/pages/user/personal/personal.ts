import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { BirthDatePipe } from '../../../pipes/birth-date-pipe';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users/users-service';
import { DateService } from '../../../services/date/date-service';
import { ToastrService } from '@openng/ngx-toastr';

@Component({
  selector: 'app-personal',
  imports: [BirthDatePipe, FormsModule],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {
  private toastr = inject(ToastrService);

  userService = inject(UsersService);
  authService = inject(AuthService);
  dateService = inject(DateService);
  isEditable = signal(false);

  // inputs
  country = this.userService.user()!.country;
  userName = this.userService.user()!.userName;
  birthDate: string = this.dateService.ISOToISODate(this.userService.user()!.birthDate);
  aboutMe = this.userService.user()!.aboutMe;

  switchEditable() {
    this.isEditable.update((prev) => !prev);
  }

  saveChanges() {
    const editableData = {
      userId: this.userService.user()!.id,
      country: this.country,
      userName: this.userName,
      birthDate: this.birthDate,
      aboutMe: this.aboutMe
    }

    this.userService.updateProfile(editableData).subscribe({
      next: (data) =>  {
        this.isEditable.set(false);
        this.toastr.success(data.message, "Оновлення профілю");
        this.userService.user.set(data.payload);
      },
      error: ({error}) => {
        this.toastr.error(error.message, "Оновлення профілю");
      }
    });
  }

  sendEmailConfirm() {
    this.authService
      .sendConfirmEmail(this.userService.user()!.id, 'http://localhost:4200/email/confirm')
      .subscribe((data) => {
        this.toastr.info(data.message, "Підтвердження пошти");
      });
  }
}
