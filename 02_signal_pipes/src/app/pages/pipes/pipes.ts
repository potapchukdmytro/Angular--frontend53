import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HryvniaPipe } from '../../pipes/hryvnia-pipe';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, HryvniaPipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.css',
})
export class Pipes {
  today: Date = new Date();
  title: string = "Вітаємо на нашому сайті"
  number: number = 23.12356
}
