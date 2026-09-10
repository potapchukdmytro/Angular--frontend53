import { Component, inject } from '@angular/core';
import { Stopwatch } from '../../services/stopwatch/stopwatch';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  stopwatch = inject(Stopwatch);
}
