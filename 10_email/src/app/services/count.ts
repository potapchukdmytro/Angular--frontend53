import { Service, signal } from '@angular/core';

@Service()
export class Count {
  public count = signal(0);

  // +1
  public increment() {
    this.count.update((prev) => prev + 1);
    console.log(this.count());
  }

  // -1
  public decrement() {
    if (this.count() > 0) {
      this.count.update((prev) => prev - 1);
    }
  }

  public updateValue(offset: number) {
    const newValue = this.count() + offset;
    if (newValue >= 0) {
      this.count.set(newValue);
    }
  }

  public reset() {
    this.count.set(0);
  }
}
