import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { User } from '../../../services/types';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  user = inject(ROUTER_OUTLET_DATA) as Signal<User>;
}
