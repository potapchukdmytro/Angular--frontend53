import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { User } from '../../../services/types';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-personal',
  imports: [],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {
  user = inject(ROUTER_OUTLET_DATA) as Signal<User>;
  authService = inject(AuthService);

  sendEmailConfirm() {
    this.authService.sendConfirmEmail(this.user().id, "http://localhost:4200/email/confirm").subscribe(() => {
      alert("Лист відправлено");
    });
  }
}
