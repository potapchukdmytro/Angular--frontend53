import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HryvniaPipe } from '../../pipes/hryvnia-pipe';
import { Currency } from '../../services/currency';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, HryvniaPipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.css',
})
export class Pipes {
  currency = inject(Currency);

  today: Date = new Date();
  title: string = "Вітаємо на нашому сайті"
  number: number = 23.12356
}
