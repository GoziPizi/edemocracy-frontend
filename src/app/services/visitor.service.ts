import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VisitorService {

  isVisitor: boolean = true;

  constructor() { }

  setIsVisitor(value: boolean) {
    this.isVisitor = value;
  }

  getIsVisitor() {
    return this.isVisitor;
  }
}
