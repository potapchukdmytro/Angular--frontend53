import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { User } from '../../../services/types';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-personal',
  imports: [],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {
  user = inject(ROUTER_OUTLET_DATA) as Signal<User>;
}
