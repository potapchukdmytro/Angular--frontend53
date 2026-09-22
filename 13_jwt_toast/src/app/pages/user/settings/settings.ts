import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/users/users-service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  usersService = inject(UsersService);
}