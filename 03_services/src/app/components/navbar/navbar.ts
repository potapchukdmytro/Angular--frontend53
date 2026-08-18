import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Count } from '../../services/count';
import { Currency } from '../../services/currency';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  counter = inject(Count);
  currency = inject(Currency);
}
