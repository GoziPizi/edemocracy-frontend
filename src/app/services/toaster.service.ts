import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  messageSubject: Subject<string> = new Subject<string>();

  constructor() { }

  success(message: string) {
    this.messageSubject.next(message);
  }

  error(message: string) {
    this.messageSubject.next(message);
  }
}
