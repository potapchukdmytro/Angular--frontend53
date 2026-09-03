import { Component, inject } from '@angular/core';
import { Count } from '../../services/count';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  counterService = inject(Count);
}
