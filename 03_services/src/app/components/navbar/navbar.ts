import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Count } from '../../services/count';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  counter = inject(Count);
}
