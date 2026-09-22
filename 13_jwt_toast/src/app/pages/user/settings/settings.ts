import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/users/users-service';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@openng/ngx-toastr';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  toastr = inject(ToastrService);

  changePasswordForm: FormGroup;
  usersService = inject(UsersService);

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  sumbitHandler() {
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value

      if(data.newPassword != data.confirmNewPassword) {        
        this.toastr.error("Паролі не збігаються", "Зміна паролю");
        return;
      }

      this.usersService.changePassword(data.oldPassword, data.newPassword).subscribe({
        next: (data) => { 
          this.toastr.success(data.message, "Зміна паролю"); 
          this.changePasswordForm.reset();
        },
        error: ({error}) => { this.toastr.error(error.message, "Зміна паролю");  }
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
