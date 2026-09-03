import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  } 

  sumbitHandler() {
    if(this.loginForm.valid) {
      this.authService.loginRequest(this.loginForm.value).subscribe({
        next: (data) => { this.authService.login(data.payload) },
        error: (error) => { console.log(error) }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
