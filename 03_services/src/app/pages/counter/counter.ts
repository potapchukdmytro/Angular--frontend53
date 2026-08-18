import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = signal(0);

  // +1
  increment() {
    this.count.update(prev => prev + 1);
    console.log(this.count());
  }

  // -1
  decrement() {
    if(this.count() > 0) {
      this.count.update(prev => prev - 1);
    }
  }

  updateValue(offset: number) {
    const newValue = this.count() + offset;
    if(newValue >= 0) {
      this.count.set(newValue);
    }
  }

  reset() {
    this.count.set(0);
  }
}
