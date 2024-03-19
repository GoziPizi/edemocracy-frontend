import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: boolean = false;
  counter: number = 0;

  constructor() { }

  increment() {
    this.counter++;
    this.loading = true;
  }

  decrement() {
    this.counter--;
    if(this.counter < 0) this.counter = 0;
    if (this.counter === 0) {
      this.loading = false;
    }
  }
}
